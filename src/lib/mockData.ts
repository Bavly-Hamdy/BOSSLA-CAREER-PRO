import { AnalysisData } from '@/types/analysis';

export const mockAnalysisData: AnalysisData = {
  overallScore: 82,
  atsScore: 88,
  matchPercentage: 78,
  executiveSummary:
    'Strong software engineering profile with solid full-stack experience in React, Node.js, and cloud technologies. The resume demonstrates impressive impact metrics in recent roles, though technical alignment with modern AI/ML frameworks could be highlighted more explicitly.',
  categoryScores: {
    impactAndMetrics: 85,
    technicalSkillsAlignment: 75,
    brevityAndClarity: 90,
    structureAndFormatting: 88,
  },
  strengths: [
    'Quantifiable achievements with clear ROI (e.g., "reduced latency by 40%")',
    'Clean, professional layout with standard section headings and clear chronology',
    'Demonstrated mastery of core modern frontend and backend tech stack',
  ],
  criticalWeaknesses: [
    'Lacks explicit mention of modern AI SDKs and cloud-native serverless architecture',
    'Some experience bullet points describe responsibilities rather than business outcome',
    'Project section needs stronger technical depth and modern framework badges',
  ],
  missingKeywords: [
    'Google Gemini API',
    'Next.js 15 App Router',
    'Vector Databases (pgvector / Pinecone)',
    'GraphQL',
    'CI/CD Pipeline Automation',
    'Capacitor',
    'Micro-frontend Architecture',
  ],
  actionableImprovements: [
    {
      section: 'Work Experience - Senior Frontend Engineer',
      originalText: 'Built user interface components for customer dashboard using React and Tailwind CSS.',
      improvedText:
        'Architected high-performance customer dashboard using React and Tailwind CSS, increasing user retention by 28% as measured by Monthly Active Users (MAU).',
      reasoning: 'Utilizes Google X-Y-Z formula to clearly state accomplishment, quantitative metric, and method.',
    },
    {
      section: 'Work Experience - Software Engineer',
      originalText: 'Managed backend API endpoints and fixed database performance bugs.',
      improvedText:
        'Optimized PostgreSQL query execution plans and Node.js REST endpoints, reducing average server response time by 45% as measured by Datadog APM metrics.',
      reasoning: 'Replaces generic wording with specific technical strategies and measurable impact.',
    },
    {
      section: 'Projects - Bossla Career Smart Resume Analyzer',
      originalText: 'Created a web app to parse resumes and output feedback using AI.',
      improvedText:
        'Engineered Bossla Career AI resume parsing engine using Next.js 15, TypeScript, and Google Gemini API, achieving 95%+ ATS parsing accuracy across 500+ tested documents.',
      reasoning: 'Highlights modern tech stack and concrete performance metrics.',
    },
  ],
  interviewQuestions: [
    {
      question: 'How do you approach optimizing rendering performance in Next.js applications?',
      focusArea: 'Technical Expertise / Next.js Architecture',
      suggestedStrategy:
        'Discuss Server Components vs Client Components, dynamic imports, image optimization, and memoization hooks (useMemo/useCallback).',
    },
    {
      question: 'Can you describe a time you integrated an AI model API into a production application?',
      focusArea: 'AI Integration & Error Handling',
      suggestedStrategy:
        'Explain structured outputs, prompt engineering, rate limiting, and fallback handling when third-party AI endpoints experience latency or invalid responses.',
    },
    {
      question: 'How do you ensure strong ATS compliance when designing digital resumes?',
      focusArea: 'ATS Formatting & Keywords',
      suggestedStrategy:
        'Mention standard fonts, simple standard section headers, clean text hierarchy, and embedding relevant job keywords naturally in bullet points.',
    },
  ],
  atsChecklist: [
    { item: 'Standard Section Headers', passed: true, details: 'Clear headers like Experience, Education, Skills.' },
    { item: 'Parseable Font Family', passed: true, details: 'Standard readable typography used throughout.' },
    { item: 'No Multi-Column Tables', passed: true, details: 'Single/clean double layout without complex tabling.' },
    { item: 'Contact Information Included', passed: true, details: 'Email, phone, and LinkedIn properly detected.' },
    { item: 'Action Verb Dominance', passed: true, details: 'Over 85% of bullet points start with strong action verbs.' },
    { item: 'Target Job Keyword Density', passed: false, details: 'Missing several specialized AI & cloud terms.' },
  ],
  coverLetter: {
    salutation: 'Dear Hiring Manager & Selection Committee,',
    opening:
      'I am writing to express my strong interest in the Senior Full Stack / Software Engineering role. With over 4 years of hands-on experience building high-scale web platforms and cloud integrations, I am excited about the opportunity to contribute immediately to your engineering team.',
    bodyParagraph:
      'In my recent engineering roles, I successfully architected customer-facing dashboards using React, Next.js, and TypeScript, resulting in a 28% increase in user retention. Additionally, I spearheaded backend API optimizations that reduced latency by 45%. My expertise aligns directly with your technical requirements, particularly in building robust TypeScript applications, leveraging modern AI SDKs like Google Gemini, and delivering clean, ATS-optimized software architectures.',
    closing:
      'Thank you for your time and consideration. I welcome the opportunity to discuss how my technical skills and quantitative achievements align with your team goals. Sincerely, Candidate Name.',
    fullText: `Dear Hiring Manager & Selection Committee,\n\nI am writing to express my strong interest in the Senior Full Stack / Software Engineering role. With over 4 years of hands-on experience building high-scale web platforms and cloud integrations, I am excited about the opportunity to contribute immediately to your engineering team.\n\nIn my recent engineering roles, I successfully architected customer-facing dashboards using React, Next.js, and TypeScript, resulting in a 28% increase in user retention. Additionally, I spearheaded backend API optimizations that reduced latency by 45%. My expertise aligns directly with your technical requirements, particularly in building robust TypeScript applications, leveraging modern AI SDKs like Google Gemini, and delivering clean, ATS-optimized software architectures.\n\nThank you for your time and consideration. I welcome the opportunity to discuss how my technical skills and quantitative achievements align with your team goals.\n\nSincerely,\nCandidate Name`,
  },
  careerProgression: {
    currentLevel: 'Senior Software Engineer / Full Stack Developer',
    nextRoles: [
      {
        title: 'Lead Full Stack Architect',
        timeframe: '1 - 2 Years',
        estimatedSalaryRange: '$130,000 - $165,000 USD / yr',
        requiredSkillGaps: ['System Design at Scale', 'Micro-frontend Architecture', 'Engineering Team Leadership'],
      },
      {
        title: 'Staff AI Solutions Engineer',
        timeframe: '2 - 3 Years',
        estimatedSalaryRange: '$150,000 - $190,000 USD / yr',
        requiredSkillGaps: ['Vector Databases (pgvector/Pinecone)', 'LLM Fine-tuning & RAG Pipelines', 'GenAI Security'],
      },
      {
        title: 'Engineering Manager (EM)',
        timeframe: '2 - 4 Years',
        estimatedSalaryRange: '$140,000 - $180,000 USD / yr',
        requiredSkillGaps: ['Agile Roadmap Planning', 'Developer Hiring & Mentorship', 'Budget Management'],
      },
    ],
  },
  rebuiltResumeMarkdown: `# CANDIDATE NAME
Senior Full Stack Engineer | AI Integration Specialist
email@example.com | +1 (555) 019-2831 | github.com/candidate | linkedin.com/in/candidate

---

## EXECUTIVE SUMMARY
Versatile Senior Software Engineer with 4+ years of expertise in React, Next.js 15, TypeScript, Node.js, and cloud ecosystems. Proven track record of scaling user retention by 28% and slashing API response latency by 45%. Specialized in building robust, ATS-compliant web applications and integrating Google Gemini AI SDKs into production workflows.

---

## CORE COMPETENCIES & KEYWORDS
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Recharts
- **Backend & Database**: Node.js, PostgreSQL, REST APIs, GraphQL, Firebase Ecosystem
- **AI & Cloud**: Google Gemini API, Prompt Engineering, CI/CD Pipeline Automation, Vercel, Docker

---

## PROFESSIONAL EXPERIENCE

### Senior Frontend Engineer | Tech Corp
*Jan 2023 - Present*
- Architected high-performance customer dashboard using React and Tailwind CSS, increasing user retention by 28% as measured by Monthly Active Users (MAU).
- Led transition to Next.js App Router and TypeScript, reducing bundle size by 35% and improving Core Web Vitals score to 98/100.
- Mentored 4 junior engineers on modern React hooks, state management, and strict type safety best practices.

### Software Engineer | Scale Solutions
*Jun 2021 - Dec 2022*
- Optimized PostgreSQL query execution plans and Node.js REST endpoints, reducing average server response time by 45% as measured by Datadog APM metrics.
- Built automated PDF generation & document parsing pipelines serving 50,000+ monthly active business users.
- Partnered with product design team to implement responsive dark-mode component libraries adhering to WCAG 2.1 accessibility standards.

---

## KEY PROJECTS

### Bossla Career AI - Smart Resume Analyzer & Career Co-Pilot
- Engineered Bossla Career AI resume parsing engine using Next.js 15, TypeScript, and Google Gemini API, achieving 95%+ ATS parsing accuracy across 500+ tested documents.
- Integrated Recharts data visualization gauges for instant 4-dimension category scoring and ATS checklist verification.

---

## EDUCATION & CERTIFICATIONS
- **B.S. in Computer Science & Engineering** | State University
- **AWS Certified Solutions Architect – Associate**
`,
};
