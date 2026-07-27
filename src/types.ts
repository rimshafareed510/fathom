export type Severity = 'critical' | 'warning' | 'info';

export type RiskCategory =
  | 'Critical Deadlines'
  | 'Application Cutoff Dates'
  | 'Visa Expiration Rules'
  | 'Renewal Requirements'
  | 'Financial Penalties'
  | 'Late Submission Penalties'
  | 'Eligibility Loss Conditions'
  | 'Required Documents'
  | 'Mandatory Actions'
  | 'Restrictions'
  | 'Exceptions'
  | 'Renewal Dates'
  | 'Appeal Deadlines'
  | 'Compliance Requirements'
  | 'Legal Obligations'
  | 'Missing Information';

export interface RiskCardData {
  id: string;
  title: string;
  category: RiskCategory;
  severity: Severity;
  explanation: string;
  quote: string;
  paragraphNumber: number;
  confidenceLevel: 'High' | 'Medium' | 'Low';
}

export interface ParagraphChunk {
  paragraphNumber: number;
  text: string;
  simplifiedText?: string;
  referenceCount: number;
  topics: string[];
}

export interface CitationHeatmapData {
  paragraphs: ParagraphChunk[];
  mostReferencedSection: number | null;
  leastReferencedSection: number | null;
  averageRetrievalScore: number;
  mostCommonTopics: string[];
}

export interface ImportantPoint {
  rank: number;
  title: string;
  explanation: string;
  paragraphNumber: number;
  impactScore: number; // 1-100
}

export interface AIInsightsData {
  estimatedReadingTimeMinutes: number;
  originalDifficultyScore: string; // e.g., "Grade 14.5 (College Level)"
  simplifiedDifficultyScore: string; // e.g., "Grade 7.2 (8th Grade Level)"
  percentageSimplification: number; // e.g., 68
  policyComplexityRating: 'Easy' | 'Medium' | 'Hard';
  totalPages: number;
  totalParagraphs: number;
  totalDeadlinesFound: number;
  totalEligibilityRules: number;
  totalRequiredDocuments: number;
  totalPenalties: number;
  totalExceptions: number;
  totalBenefits: number;
  top5ImportantPoints: ImportantPoint[];
}

export interface EligibilityQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; isEligible: boolean; note?: string }[];
  paragraphCitation: number;
  explanation: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  rawText: string;
  paragraphs: ParagraphChunk[];
  risks: RiskCardData[];
  insights: AIInsightsData;
  eligibilityQuestions: EligibilityQuestion[];
  summary: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  citations?: number[];
  timestamp: string;
}

export interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}
