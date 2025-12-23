export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: "critical" | "major" | "moderate" | "minor";
  confidence: "high" | "medium" | "low";
  description: string;
  mechanism: string;
  clinicalEffects: string;
  recommendations: string;
  citations: Citation[];
  alternatives?: DrugAlternative[];
}

export interface Citation {
  source: string;
  title: string;
  url?: string;
}

export interface DrugSearchResult {
  name: string;
  rxcui?: string;
  synonym?: string;
}

export interface DrugAlternative {
  name: string;
  reason: string;
  considerations?: string;
}

export interface DrugInfo {
  name: string;
  overview: string;
  drugClass: string;
  sideEffects: string[];
  contraindications: string[];
  dosingGuidelines: string;
  warnings: string[];
  interactions: string[];
}
