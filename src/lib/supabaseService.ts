import { supabase } from './supabase';
import type { Case, Entity, Relationship, NLPItem, AuditLog } from '../types';

export const supabaseService = {
  // Fetch Cases from Supabase
  async fetchCases(): Promise<Case[] | null> {
    try {
      const { data, error } = await supabase.from('cases').select('*');
      if (error || !data) return null;
      return data.map(c => ({
        id: c.id,
        title: c.title,
        caseNumber: c.case_number || c.caseNumber,
        status: c.status,
        threatLevel: c.threat_level || c.threatLevel,
        leadInvestigator: c.lead_investigator || c.leadInvestigator,
        entityCount: c.entity_count || c.entityCount || 0,
        relationshipCount: c.relationship_count || c.relationshipCount || 0,
        lastUpdated: c.last_updated || c.lastUpdated || new Date().toISOString(),
        description: c.description || '',
        targetCell: c.target_cell || c.targetCell || '',
        tags: c.tags || []
      }));
    } catch {
      return null;
    }
  },

  // Fetch Entities from Supabase
  async fetchEntities(): Promise<Entity[] | null> {
    try {
      const { data, error } = await supabase.from('entities').select('*');
      if (error || !data) return null;
      return data.map(e => ({
        id: e.id,
        name: e.name,
        type: e.type,
        riskScore: e.risk_score ?? e.riskScore ?? 80,
        threatLevel: e.threat_level || e.threatLevel || 'HIGH',
        confidenceScore: e.confidence_score ?? e.confidenceScore ?? 95,
        sourceTag: e.source_tag || e.sourceTag || 'FIR',
        centrality: e.centrality || {
          degree: e.degree || 2,
          betweenness: e.betweenness || 0.5,
          pageRank: e.page_rank || 0.1
        },
        phone: e.phone,
        vehiclePlate: e.vehicle_plate || e.vehiclePlate,
        accountNumber: e.account_number || e.accountNumber,
        locationName: e.location_name || e.locationName,
        coordinates: e.coordinates,
        associatedCaseIds: e.associated_case_ids || e.associatedCaseIds || [],
        notesCount: e.notes_count ?? e.notesCount ?? 1,
        aiFlags: e.ai_flags || e.aiFlags || [],
        roleDescription: e.role_description || e.roleDescription
      }));
    } catch {
      return null;
    }
  },

  // Fetch Relationships from Supabase
  async fetchRelationships(): Promise<Relationship[] | null> {
    try {
      const { data, error } = await supabase.from('relationships').select('*');
      if (error || !data) return null;
      return data.map(r => ({
        id: r.id,
        source: r.source_id || r.source,
        target: r.target_id || r.target,
        type: r.type,
        label: r.label,
        confidence: r.confidence || 90,
        verified: r.verified ?? true,
        thickness: r.thickness || 3,
        amount: r.amount,
        frequency: r.frequency,
        lastTimestamp: r.last_timestamp || r.lastTimestamp,
        sourceDoc: r.source_doc || r.sourceDoc,
        aiFlagged: r.ai_flagged || r.aiFlagged,
        aiReason: r.ai_reason || r.aiReason
      }));
    } catch {
      return null;
    }
  },

  // Insert Entity to Supabase
  async insertEntity(entity: Entity) {
    try {
      await supabase.from('entities').insert({
        id: entity.id,
        name: entity.name,
        type: entity.type,
        risk_score: entity.riskScore,
        threat_level: entity.threatLevel,
        confidence_score: entity.confidenceScore,
        source_tag: entity.sourceTag,
        degree: entity.centrality?.degree || 1,
        betweenness: entity.centrality?.betweenness || 0.1,
        page_rank: entity.centrality?.pageRank || 0.05,
        phone: entity.phone,
        vehicle_plate: entity.vehiclePlate,
        account_number: entity.accountNumber,
        location_name: entity.locationName,
        role_description: entity.roleDescription,
        ai_flags: entity.aiFlags || []
      });
    } catch (err) {
      console.warn('Supabase Insert Entity Notice:', err);
    }
  },

  // Insert Relationship to Supabase
  async insertRelationship(rel: Relationship) {
    try {
      await supabase.from('relationships').insert({
        id: rel.id,
        source_id: rel.source,
        target_id: rel.target,
        type: rel.type,
        label: rel.label,
        confidence: rel.confidence,
        verified: rel.verified,
        thickness: rel.thickness,
        amount: rel.amount,
        frequency: rel.frequency,
        source_doc: rel.sourceDoc,
        ai_flagged: rel.aiFlagged,
        ai_reason: rel.aiReason
      });
    } catch (err) {
      console.warn('Supabase Insert Relationship Notice:', err);
    }
  },

  // Insert NLP Item to Supabase
  async insertNLPItem(item: NLPItem) {
    try {
      await supabase.from('nlp_extractions').insert({
        id: item.id,
        source_document: item.sourceDocument,
        extracted_name: item.extractedName,
        extracted_type: item.extractedType,
        confidence_score: item.confidenceScore,
        text_snippet: item.textSnippet,
        full_text_payload: item.fullTextPayload,
        status: item.status
      });
    } catch (err) {
      console.warn('Supabase Insert NLP Item Notice:', err);
    }
  },

  // Insert Audit Log to Supabase
  async insertAuditLog(log: AuditLog) {
    try {
      await supabase.from('audit_logs').insert({
        id: log.id,
        actor: log.actor || log.user || 'Analyst',
        role: log.role || 'Analyst',
        action: log.action,
        target: log.target || log.resource || 'System',
        resource: log.resource || log.target || 'System',
        status: log.status || 'SUCCESS',
        ip_address: log.ipAddress || '10.240.8.12'
      });
    } catch (err) {
      console.warn('Supabase Insert Audit Log Notice:', err);
    }
  }
};
