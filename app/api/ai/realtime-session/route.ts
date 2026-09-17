import { NextResponse } from 'next/server';
import { VOICE_COACHING_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  try {
    const { profile, futureSelf, plan, todayTotals } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key configured' }, { status: 500 });
    }

    const model = process.env.OPENAI_REALTIME_MODEL || 'gpt-realtime';

    // Mint a short-lived browser token. The project API key stays server-side.
    const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session: {
          type: 'realtime',
          model,
        }
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI Realtime session error:', response.status, err);
      return NextResponse.json({ error: err, status: response.status }, { status: response.status });
    }

    const session = await response.json();

    const instructions = `
${VOICE_COACHING_SYSTEM_PROMPT}

User Context:
- Name: ${profile?.name || 'the user'}
- Current weight: ${profile?.weightKg || 'unknown'} kg
- Target weight: ${profile?.targetWeightKg || 'unknown'} kg
- Primary goal: ${profile?.primaryGoal || 'get healthier'}
- Future Self target: ${futureSelf?.targetOutcome || 'their goal'}
- Timeframe: ${futureSelf?.timeframe || '12 months'}

Today so far:
- Calories: ${todayTotals?.calories || 0} / ${plan?.calorieTarget || 0} kcal
- Protein: ${todayTotals?.protein || 0} / ${plan?.proteinTargetG || 0} g
- Water: ${todayTotals?.water || 0} / ${plan?.waterTargetMl || 3000} ml
`.trim();

    const tools = [
      {
        type: 'function',
        name: 'log_nutrition',
        description: 'Log a meal or food items the user has eaten.',
        parameters: {
          type: 'object',
          properties: {
            meal: { type: 'string', enum: ['breakfast', 'lunch', 'dinner', 'snack', 'unknown'] },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  quantity: { type: 'number' },
                  unit: { type: 'string' },
                  estimatedCalories: { type: 'number' },
                  estimatedProteinG: { type: 'number' },
                },
                required: ['name', 'unit', 'estimatedCalories', 'estimatedProteinG']
              }
            }
          },
          required: ['meal', 'items']
        }
      },
      {
        type: 'function',
        name: 'log_water',
        description: 'Log water intake whenever the user mentions drinking water.',
        parameters: {
          type: 'object',
          properties: {
            amount: { type: 'number' },
            unit: { type: 'string' },
            normalizedMillilitres: { type: 'number' },
          },
          required: ['amount', 'unit', 'normalizedMillilitres']
        }
      },
      {
        type: 'function',
        name: 'log_workout',
        description: 'Log a workout or exercise the user completed.',
        parameters: {
          type: 'object',
          properties: {
            exercise: { type: 'string' },
            sets: { type: 'number' },
            reps: { type: 'number' },
            loadKg: { type: 'number' },
            durationMinutes: { type: 'number' },
            notes: { type: 'string' },
          },
          required: ['exercise']
        }
      }
    ];

    // Return session token + config for client-side session.update
    return NextResponse.json({
      ...session,
      sessionConfig: { instructions, tools, voice: 'alloy' }
    });
  } catch (error: any) {
    console.error('Realtime session error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
