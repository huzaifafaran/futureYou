import { NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/ai/client';
import { COACHING_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { CoachingResponseSchema } from '@/lib/ai/schemas';
import { fallbackCoach } from '@/lib/ai/fallback';
import { zodResponseFormat } from 'openai/helpers/zod';

export async function POST(req: Request) {
  let context: any = {};
  try {
    context = await req.json();
    const openai = getOpenAIClient();

    if (!openai) {
      const fallbackResult = await fallbackCoach(context);
      return NextResponse.json({ data: fallbackResult, mode: 'fallback' });
    }

    const systemContext = `
${COACHING_SYSTEM_PROMPT}

Confirmed State Context:
- Profile: ${JSON.stringify(context.aiContext?.userNow)}
- Future Self Target: ${JSON.stringify(context.aiContext?.futureSelf)}
- Plan (Deterministic Targets): ${JSON.stringify(context.aiContext?.plan)}
- Daily Totals: ${JSON.stringify(context.aiContext?.today)}
${context.recentEvent ? `- Recent Event Logged: ${JSON.stringify(context.recentEvent)}\n- Deterministic Progression Result: ${JSON.stringify(context.deterministicResult)}` : ''}
${context.aiContext?.pendingClarification ? `- PENDING CLARIFICATION STATE: ${JSON.stringify(context.aiContext.pendingClarification)}\n(The user is answering a clarification question about this data)` : ''}
`;

    const lastUserMessage = context.message || (context.recentEvent ? `I just logged a new ${context.recentEvent.type} event.` : 'Hello.');

    const openAiMessages = [
      { role: 'system', content: systemContext },
      ...(context.aiContext?.recentConversation || []).slice(-6).map((m: any) => ({ 
        role: m.role === 'user' ? 'user' : 'assistant', 
        content: `[Time: ${new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}] ${m.content}` 
      })),
      { role: 'user', content: `[Time: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}] ${lastUserMessage}` }
    ] as any;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_COACH_MODEL || 'gpt-4o-mini',
      messages: openAiMessages,
      response_format: zodResponseFormat(CoachingResponseSchema, 'coaching'),
    });

    const parsed = JSON.parse(response.choices[0].message.content || '{}');
    const validated = CoachingResponseSchema.parse(parsed);

    return NextResponse.json({ data: validated, mode: 'live' });
  } catch (error: any) {
    console.error('Coaching API error:', error);
    return NextResponse.json({
      data: await fallbackCoach(context),
      mode: 'fallback',
    });
  }
}
