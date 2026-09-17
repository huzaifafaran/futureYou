import { NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/ai/client';
import { FutureSelfProfileSchema } from '@/lib/schemas';
import { zodResponseFormat } from 'openai/helpers/zod';

export async function POST(req: Request) {
  try {
    const { name, weightKg, targetWeightKg, primaryGoal, timeframe, outcomes, stopDoing, goodDay } = await req.json();

    const openai = getOpenAIClient();

    if (!openai) {
      // Deterministic fallback if OpenAI is not configured
      const fallback = {
        timeframe: timeframe || "12 months",
        identity: ["strong", "mobile", "disciplined"],
        targetOutcome: `Reach ${targetWeightKg || weightKg} kg through sustainable habits`,
        values: [
          "Log honestly",
          "Consistency over perfection",
          "Protect long-term mobility"
        ],
        userWrittenNotes: stopDoing ? `I will stop: ${stopDoing}` : ""
      };
      return NextResponse.json({ data: fallback });
    }

    const systemPrompt = `
You are an expert fitness coach analyzing an onboarding interview.
The user's name is ${name}.
Current weight: ${weightKg}kg.
Target weight: ${targetWeightKg || 'N/A'}kg.
Primary Goal: ${primaryGoal}.
Timeframe: ${timeframe}.

Selected Outcomes: ${outcomes?.join(', ')}
What they need to stop doing: ${stopDoing}
What a good day looks like: ${goodDay}

Create a structured FutureSelfProfile. Extract 3-5 key identity words, a single targetOutcome phrase, and 3-4 core values or standards based on what they said. Be concise, grounded, and use plain language.
`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_EXTRACTION_MODEL || 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }],
      response_format: zodResponseFormat(FutureSelfProfileSchema, 'futureSelfProfile'),
    });

    const parsed = JSON.parse(response.choices[0].message.content || '{}');
    const validated = FutureSelfProfileSchema.parse(parsed);

    return NextResponse.json({ data: validated });
  } catch (error: any) {
    console.error('Future Self Generation error:', error);
    // Fallback on error
    return NextResponse.json({ 
      data: {
        timeframe: "12 months",
        identity: ["strong", "mobile", "disciplined"],
        targetOutcome: `Reach a healthier state through sustainable habits`,
        values: [
          "Log honestly",
          "Consistency over perfection",
          "Protect long-term mobility"
        ],
        userWrittenNotes: ""
      }
    });
  }
}
