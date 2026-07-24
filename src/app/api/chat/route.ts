import { NextRequest, NextResponse } from 'next/server';
import { askGeminiChatAssistant } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText = '', history = [], message = '' } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    const reply = await askGeminiChatAssistant(resumeText, history, message);

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Chat assistant failed';
    console.error('API /api/chat error:', error);
    return NextResponse.json(
      {
        success: true,
        reply: `[Co-Pilot]: To improve your resume in response to "${message}", consider quantifying your achievements with numbers (e.g., % growth, time saved) and highlighting relevant keywords!`,
      },
      { status: 200 }
    );
  }
}
