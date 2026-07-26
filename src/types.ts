export type RiskSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export type RiskLevel = 
  | 'Safe/Legitimate'
  | 'Low Risk'
  | 'Caution'
  | 'High Risk'
  | 'Extreme Scam Warning';

export interface RedFlag {
  label: string;
  explanation: string;
  severity: RiskSeverity;
}

export interface GreenFlag {
  label: string;
  explanation: string;
}

export interface PredatoryClause {
  clause: string;
  explanation: string;
}

export interface AnalysisResult {
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  detectedPattern: string;
  summary: string;
  redFlags: RedFlag[];
  greenFlags: GreenFlag[];
  predatoryClauses: PredatoryClause[];
  recommendedSteps: string[];
  suggestedReply: string;
  probingQuestions: string[];
  analyzedAt?: string;
  inputSnippet?: string;
}

export interface AnalyzeRequestBody {
  text?: string;
  imageBase64?: string;
  mimeType?: string;
}

export interface ScamPatternItem {
  id: string;
  title: string;
  category: 'Payment Scams' | 'Work Exploitation' | 'Identity & Phishing' | 'Contract Hazards' | 'Off-Platform Fraud';
  riskLevel: 'High' | 'Extreme' | 'Caution';
  summary: string;
  howItWorks: string[];
  realWorldExample: string;
  redFlags: string[];
  howToProtect: string[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  contextType: 'Job Post' | 'Client Message' | 'Contract Clause' | 'Payment Request';
  submittedTextSnippet: string;
  options: {
    label: string;
    verdict: 'scam' | 'legitimate' | 'caution';
  }[];
  correctVerdict: 'scam' | 'legitimate' | 'caution';
  explanation: string;
  keyTakeaway: string;
}
