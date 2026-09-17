import { NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/ai/client';
import { EXTRACTION_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { InterpretationSchema } from '@/lib/ai/schemas';
import { fallbackInterpret } from '@/lib/ai/fallback';
import { zodResponseFormat } from 'openai/helpers/zod';

export async function POST(req: Request) {
  let message = '';
  try {
    const body = await req.json();
    message = body.message || '';
    const { aiContext } = body;
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 });

    const openai = getOpenAIClient();

    if (!openai) {
      const fallbackResult = await fallbackInterpret(message);
      return NextResponse.json({ data: fallbackResult, mode: 'fallback' });
    }

    const systemContext = `
${EXTRACTION_SYSTEM_PROMPT}

Confirmed State Context:
- Profile: ${JSON.stringify(aiContext?.userNow)}
- Plan (Deterministic Targets): ${JSON.stringify(aiContext?.plan)}
${aiContext?.pendingClarification ? `
PENDING CLARIFICATION - CRITICAL INSTRUCTION:
The user previously started logging a ${aiContext.pendingClarification.type} entry but clarification was needed.
Previously extracted data: ${JSON.stringify(aiContext.pendingClarification.data)}
The user's current message is their ANSWER to the clarification question.
You MUST merge the user's answer with the previously extracted data above.
Return a complete, resolved extraction - set requiresClarification to false and requiresConfirmation to false.
Do NOT ask another clarification question. Resolve and return the full combined entry.
` : ''}
`;

    const openAiMessages = [
      { role: 'system', content: systemContext },
      ...(aiContext?.recentConversation || []).slice(-6).map((m: any) => ({ 
        role: m.role === 'user' ? 'user' : 'assistant', 
        content: `[Time: ${new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}] ${m.content}` 
      })),
      { role: 'user', content: `[Time: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}] ${message}` }
    ] as any;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_EXTRACTION_MODEL || 'gpt-4o-mini',
      messages: openAiMessages,
      response_format: zodResponseFormat(InterpretationSchema, 'interpretation'),
    });

    const parsed = JSON.parse(response.choices[0].message.content || '{}');
    const validated = InterpretationSchema.parse(parsed);

    return NextResponse.json({ data: validated, mode: 'live' });
  } catch (error: any) {
    console.error('Interpretation API error:', error);
    // A provider/schema failure should preserve the usable offline path rather than
    // turn a normal user message into a dead end.
    const fallbackResult = await fallbackInterpret(message);
    return NextResponse.json({ data: fallbackResult, mode: 'fallback' });
  }
}
