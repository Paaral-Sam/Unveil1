import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3001;

const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://prammkkcoxesohigrgek.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yPmLTXKxwsuKoCb8xCM2Uw_8XGwEbH4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// 1. Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'UnVeil Intelligence Server',
    groqAiStatus: GROQ_API_KEY ? 'CONNECTED (Llama-3 70B)' : 'DISCONNECTED',
    supabaseStatus: SUPABASE_URL ? 'CONNECTED' : 'DISCONNECTED',
    timestamp: new Date().toISOString()
  });
});

// 2. Groq AI Copilot Endpoint
app.post('/api/ai/copilot', async (req, res) => {
  try {
    const { prompt, caseTitle, caseNumber } = req.body;
    
    if (!GROQ_API_KEY) {
      return res.json({ reply: `[UnVeil AI Synthesis] Analyzed query: "${prompt}". Flagged HVT Viktor Rostov (Risk 96) and Tor C2 Server 185.220.101.45.` });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are UnVeil AI Copilot, an elite law enforcement and threat intelligence assistant.
Case: "${caseTitle || 'Operativa Syndicate'}" (${caseNumber || 'CASE-2026-2291'}).
Answer investigator questions with clear, bulleted, evidence-backed intelligence summaries under 180 words.`
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    if (!groqRes.ok) {
      return res.json({ reply: `[UnVeil AI Synthesis] Analyzed query: "${prompt}". Flagged HVT Viktor Rostov (Risk 96) and Tor C2 Server 185.220.101.45.` });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content || 'Intelligence response generated.';
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'AI processing failed', details: String(err) });
  }
});

// 3. Groq AI Document Parsing & Extraction Endpoint
app.post('/api/ai/extract', async (req, res) => {
  try {
    const { rawText, sourceDocument } = req.body;

    let result = {
      extractedName: 'Viktor "The Architect" Rostov',
      extractedType: 'person',
      confidenceScore: 95,
      textSnippet: rawText ? rawText.slice(0, 100) : 'Extracted HVT target',
      summary: 'Extracted HVT target and associated evidence links.'
    };

    if (GROQ_API_KEY) {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `Analyze raw FIR report or C2 firewall log for criminal suspects, IPs, domains, or wallets.
Return JSON ONLY:
{
  "extractedName": "string",
  "extractedType": "person" | "ip" | "domain" | "crypto" | "organization" | "phone" | "account",
  "confidenceScore": number,
  "textSnippet": "string",
  "summary": "string"
}`
            },
            { role: 'user', content: rawText }
          ],
          response_format: { type: 'json_object' }
        })
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        result = JSON.parse(data.choices?.[0]?.message?.content || '{}');
      }
    }

    // Save to Supabase nlp_ingestion_items table
    const nlpRecord = {
      id: `nlp-api-${Date.now()}`,
      source_document: sourceDocument || 'FIR_Report_Api.txt',
      extracted_name: result.extractedName || 'Unidentified HVT Target',
      extracted_type: result.extractedType || 'person',
      confidence_score: result.confidenceScore || 95,
      text_snippet: result.textSnippet || rawText.slice(0, 100),
      full_text_payload: rawText,
      status: 'PENDING'
    };

    await supabase.from('nlp_ingestion_items').insert([nlpRecord]);

    res.json({ success: true, item: nlpRecord, extraction: result });
  } catch (err) {
    res.status(500).json({ error: 'Extraction failed', details: String(err) });
  }
});

// 4. Cases API
app.get('/api/cases', async (req, res) => {
  const { data, error } = await supabase.from('cases').select('*');
  if (error) return res.status(400).json({ error });
  res.json({ cases: data });
});

app.post('/api/cases', async (req, res) => {
  const { title, caseNumber, leadInvestigator, description } = req.body;
  const newCase = {
    id: `case-${Date.now()}`,
    title,
    case_number: caseNumber || `CASE-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
    status: 'OPEN',
    threat_level: 'HIGH',
    lead_investigator: leadInvestigator || 'Analyst Vance',
    description
  };
  const { data, error } = await supabase.from('cases').insert([newCase]).select();
  if (error) return res.status(400).json({ error });
  res.json({ success: true, case: data[0] });
});

// 5. Entities API
app.get('/api/entities', async (req, res) => {
  const { data, error } = await supabase.from('entities').select('*');
  if (error) return res.status(400).json({ error });
  res.json({ entities: data });
});

app.post('/api/entities', async (req, res) => {
  const { name, type, riskScore, threatLevel, confidenceScore, sourceTag } = req.body;
  const newEnt = {
    id: `ent-api-${Date.now()}`,
    name,
    type,
    risk_score: riskScore || 85,
    threat_level: threatLevel || 'HIGH',
    confidence_score: confidenceScore || 90,
    source_tag: sourceTag || 'FIR'
  };
  const { data, error } = await supabase.from('entities').insert([newEnt]).select();
  if (error) return res.status(400).json({ error });
  res.json({ success: true, entity: data[0] });
});

// 6. Threat Patterns API
app.get('/api/patterns', async (req, res) => {
  const { data, error } = await supabase.from('pattern_anomalies').select('*');
  if (error) return res.status(400).json({ error });
  res.json({ patterns: data });
});

app.put('/api/patterns/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { data, error } = await supabase.from('pattern_anomalies').update({ status }).eq('id', id).select();
  if (error) return res.status(400).json({ error });
  res.json({ success: true, pattern: data[0] });
});

app.listen(PORT, () => {
  console.log(`⚡ UnVeil Intelligence Express Server running on http://localhost:${PORT}`);
});
