export interface CategoryScores {
  impactAndMetrics: number;
  technicalSkillsAlignment: number;
  brevityAndClarity: number;
  structureAndFormatting: number;
}

export interface ActionableImprovement {
  section: string;
  originalText: string;
  improvedText: string;
  reasoning: string;
}

export interface InterviewQuestion {
  question: string;
  focusArea: string;
  suggestedStrategy: string;
}

export interface ATSChecklistItem {
  item: string;
  passed: boolean;
  details: string;
}

export interface CoverLetter {
  salutation: string;
  opening: string;
  bodyParagraph: string;
  closing: string;
  fullText: string;
}

export interface NextRoleOption {
  title: string;
  timeframe: string;
  estimatedSalaryRange: string;
  requiredSkillGaps: string[];
}

export interface CareerProgression {
  currentLevel: string;
  nextRoles: NextRoleOption[];
}

export interface AnalysisData {
  overallScore: number;
  atsScore: number;
  matchPercentage: number;
  executiveSummary: string;
  categoryScores: CategoryScores;
  strengths: string[];
  criticalWeaknesses: string[];
  missingKeywords: string[];
  actionableImprovements: ActionableImprovement[];
  interviewQuestions: InterviewQuestion[];
  atsChecklist: ATSChecklistItem[];
  coverLetter: CoverLetter;
  careerProgression: CareerProgression;
  rebuiltResumeMarkdown: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
