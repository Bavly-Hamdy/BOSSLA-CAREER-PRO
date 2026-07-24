import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisData } from '@/types/analysis';
import { mockAnalysisData } from './mockData';

export async function analyzeResumeWithGemini(
  resumeText: string,
  jobDescription?: string
): Promise<AnalysisData> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('GEMINI_API_KEY missing. Returning mock analysis data.');
    return mockAnalysisData;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are Bossla Career's Chief Executive Resume Auditor, ATS Algorithm Specialist, and Senior Career Strategist.
Perform a forensic, line-by-line analysis of the candidate's ACTUAL resume text below.
DO NOT output generic placeholder text. All feedback, scores, keyword gaps, bullet rewrites, cover letter, and rebuilt markdown resume MUST be 100% authentic, accurate, realistic, and deeply tailored to the candidate's real experience and the provided Job Description.

CANDIDATE RESUME TEXT:
"""
${resumeText}
"""

${
  jobDescription && jobDescription.trim().length > 10
    ? `TARGET JOB DESCRIPTION:
"""
${jobDescription}
"""`
    : 'TARGET JOB DESCRIPTION: None provided. Assess general industry standards for the candidate\'s field.'
}

INSTRUCTIONS FOR FORENSIC ACCURACY:
1. "overallScore", "atsScore", "matchPercentage": Calculate realistic, granular integer scores (0-100) based on actual content quality, ATS readability, and job match.
2. "executiveSummary": Write 2-3 sharp, professional sentences summarizing the candidate's real background, primary strengths, and key area for growth.
3. "categoryScores": Provide realistic category breakdown scores (0-100) for impactAndMetrics, technicalSkillsAlignment, brevityAndClarity, structureAndFormatting.
4. "strengths": 3 specific, authentic strengths observed directly in their resume.
5. "criticalWeaknesses": 3 specific, actionable flaws or missing elements in their resume.
6. "missingKeywords": List 6-10 actual missing technical tools, frameworks, methodologies, or soft skills present in the target job description or expected in their seniority level.
7. "actionableImprovements": Pick 3 ACTUAL weak or unquantified bullet points directly from their resume text. Rewrite each bullet using Google's X-Y-Z formula ("Accomplished [X], as measured by [Y], by doing [Z]"). Provide detailed reasoning.
8. "interviewQuestions": Generate 3 tailored interview questions targeting vulnerabilities or key projects in their resume, with STAR strategy guidance.
9. "atsChecklist": 4 ATS formatting verification items evaluated against their resume text.
10. "coverLetter": Draft a highly professional 3-paragraph executive cover letter (salutation, opening, bodyParagraph, closing, fullText) referencing their actual skills and target job.
11. "careerProgression": Predict 3 realistic next-tier career promotion options with timeframe, estimated market salary range (e.g. "$90,000 - $110,000" or local currency), and skill gap roadmap.
12. "rebuiltResumeMarkdown": Rebuild their ENTIRE resume into a pristine 100% ATS-compliant Markdown document incorporating all improved Google X-Y-Z bullet points and proper section headers.

Respond ONLY with a valid JSON object matching this schema:
{
  "overallScore": number,
  "atsScore": number,
  "matchPercentage": number,
  "executiveSummary": string,
  "categoryScores": {
    "impactAndMetrics": number,
    "technicalSkillsAlignment": number,
    "brevityAndClarity": number,
    "structureAndFormatting": number
  },
  "strengths": [string],
  "criticalWeaknesses": [string],
  "missingKeywords": [string],
  "actionableImprovements": [
    {
      "section": string,
      "originalText": string,
      "improvedText": string,
      "reasoning": string
    }
  ],
  "interviewQuestions": [
    {
      "question": string,
      "focusArea": string,
      "suggestedStrategy": string
    }
  ],
  "atsChecklist": [
    {
      "item": string,
      "passed": boolean,
      "details": string
    }
  ],
  "coverLetter": {
    "salutation": string,
    "opening": string,
    "bodyParagraph": string,
    "closing": string,
    "fullText": string
  },
  "careerProgression": {
    "currentLevel": string,
    "nextRoles": [
      {
        "title": string,
        "timeframe": string,
        "estimatedSalaryRange": string,
        "requiredSkillGaps": [string]
      }
    ]
  },
  "rebuiltResumeMarkdown": string
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            atsScore: { type: Type.INTEGER },
            matchPercentage: { type: Type.INTEGER },
            executiveSummary: { type: Type.STRING },
            categoryScores: {
              type: Type.OBJECT,
              properties: {
                impactAndMetrics: { type: Type.INTEGER },
                technicalSkillsAlignment: { type: Type.INTEGER },
                brevityAndClarity: { type: Type.INTEGER },
                structureAndFormatting: { type: Type.INTEGER },
              },
              required: ['impactAndMetrics', 'technicalSkillsAlignment', 'brevityAndClarity', 'structureAndFormatting'],
            },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            criticalWeaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionableImprovements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  originalText: { type: Type.STRING },
                  improvedText: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                },
                required: ['section', 'originalText', 'improvedText', 'reasoning'],
              },
            },
            interviewQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  focusArea: { type: Type.STRING },
                  suggestedStrategy: { type: Type.STRING },
                },
                required: ['question', 'focusArea', 'suggestedStrategy'],
              },
            },
            atsChecklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  passed: { type: Type.BOOLEAN },
                  details: { type: Type.STRING },
                },
                required: ['item', 'passed', 'details'],
              },
            },
            coverLetter: {
              type: Type.OBJECT,
              properties: {
                salutation: { type: Type.STRING },
                opening: { type: Type.STRING },
                bodyParagraph: { type: Type.STRING },
                closing: { type: Type.STRING },
                fullText: { type: Type.STRING },
              },
              required: ['salutation', 'opening', 'bodyParagraph', 'closing', 'fullText'],
            },
            careerProgression: {
              type: Type.OBJECT,
              properties: {
                currentLevel: { type: Type.STRING },
                nextRoles: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      timeframe: { type: Type.STRING },
                      estimatedSalaryRange: { type: Type.STRING },
                      requiredSkillGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ['title', 'timeframe', 'estimatedSalaryRange', 'requiredSkillGaps'],
                  },
                },
              },
              required: ['currentLevel', 'nextRoles'],
            },
            rebuiltResumeMarkdown: { type: Type.STRING },
          },
          required: [
            'overallScore',
            'atsScore',
            'matchPercentage',
            'executiveSummary',
            'categoryScores',
            'strengths',
            'criticalWeaknesses',
            'missingKeywords',
            'actionableImprovements',
            'interviewQuestions',
            'atsChecklist',
            'coverLetter',
            'careerProgression',
            'rebuiltResumeMarkdown',
          ],
        },
      },
    });

    if (response.text) {
      const parsedData = JSON.parse(response.text) as AnalysisData;
      return parsedData;
    }

    return mockAnalysisData;
  } catch (error) {
    console.error('Gemini API call failed, falling back to mock data:', error);
    return mockAnalysisData;
  }
}

export async function askGeminiChatAssistant(
  resumeText: string,
  chatHistory: { sender: string; content: string }[],
  userMessage: string
): Promise<string> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    return `[Bossla Career Assistant]: Here is advice on "${userMessage}": Focus on tailoring your bullet points with measurable key performance metrics (e.g. ROI, %, time saved) and aligning your top skills directly with target job requirements.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const formattedHistory = chatHistory
      .map((msg) => `${msg.sender.toUpperCase()}: ${msg.content}`)
      .join('\n');

    const prompt = `
You are the Bossla Career AI Co-Pilot, an expert career compass and resume strategist.
Below is the candidate's resume context:
"""
${resumeText}
"""

Recent Conversation History:
${formattedHistory}

Candidate's Question:
"${userMessage}"

Provide a concise, direct, highly encouraging, and actionable answer tailored specifically to their resume and career goals.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || 'I could not process your question at this moment. Please try asking again.';
  } catch (error) {
    console.error('Gemini Chat error:', error);
    return 'Our Bossla Career AI co-pilot service is temporarily limited. Consider focusing on quantifying your accomplishments and emphasizing core technical keywords!';
  }
}
