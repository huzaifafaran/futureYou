import { NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/ai/client';
import { zodResponseFormat } from 'openai/helpers/zod';
import { IntentClassificationSchema } from '@/lib/ai/schemas';
import { CLASSIFICATION_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const openai = getOpenAIClient();

    if (!openai) {
      // Very basic keyword fallback if no API key is provided
      const lower = message.toLowerCase();
      if (lower.match(/^(hi|hello|hey|how|why|what|can you|help)/)) {
        return NextResponse.json({ data: { classification: 'conversation', confidence: 1 }, mode: 'fallback' });
      }
      return NextResponse.json({ data: { classification: 'log', confidence: 1 }, mode: 'fallback' });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_EXTRACTION_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: CLASSIFICATION_SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      response_format: zodResponseFormat(IntentClassificationSchema, 'classification'),
      temperature: 0.1,
      max_tokens: 50,
    });

    const parsed = JSON.parse(response.choices[0].message.content || '{}');
    const validated = IntentClassificationSchema.parse(parsed);

    return NextResponse.json({ data: validated, mode: 'live' });
  } catch (error) {
    console.error('Classification error:', error);
    // On error, default to log so it hits extraction which might be able to handle it, 
    // or fallback to conversation if we want to be safe. We'll fallback to log.
    return NextResponse.json({ 
      data: { classification: 'log', confidence: 0 },
      mode: 'fallback',
      error: 'Failed to classify'
    });
  }
}
