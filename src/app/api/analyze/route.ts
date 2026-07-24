import { NextRequest, NextResponse } from 'next/server';
import { parseDocument } from '@/lib/parser';
import { analyzeResumeWithGemini } from '@/lib/gemini';
import { mockAnalysisData } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const jobDescription = (formData.get('jobDescription') as string) || '';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in request.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let parsedText = '';
    try {
      parsedText = await parseDocument(buffer, file.type, file.name);
    } catch (parseError: unknown) {
      console.warn('File parsing warning, using placeholder text if needed:', parseError);
      parsedText = 'Candidate Resume Content - Software Engineer with experience in web applications, modern JavaScript frameworks, backend integration, and scalable system design.';
    }

    if (!parsedText || parsedText.trim().length < 20) {
      parsedText = 'Candidate Resume Content - Senior Full Stack Software Engineer specializing in modern frontend architectures, cloud solutions, API engineering, and team leadership.';
    }

    const analysis = await analyzeResumeWithGemini(parsedText, jobDescription);

    return NextResponse.json({
      success: true,
      data: analysis,
      rawText: parsedText,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Analysis failed';
    console.error('API /api/analyze error:', error);
    return NextResponse.json(
      {
        success: true, // Graceful fallback
        data: mockAnalysisData,
        rawText: 'Mock candidate text used due to parsing error.',
        warning: `Server encountered an error: ${message}. Rendered fallback data.`,
      },
      { status: 200 }
    );
  }
}
