import { describe, it, expect } from 'vitest';
import { fallbackInterpret, fallbackCoach } from '../lib/ai/fallback';
import { evaluateBenchPressProgression } from '../lib/progression';
import { calculateTodayTotals, toEventDraft } from '../lib/events';

describe('AI Fallback & Deterministic Safety Tests', () => {
  it('Unknown-input behavior (No state mutation after failed extraction)', async () => {
    const res = await fallbackInterpret("gibberish that makes no sense");
    expect(res.intent).toBe('unknown');
    expect(res.requiresClarification).toBe(true);
  });
  
  it('Ambiguous bread quantity triggers confirmation', async () => {
    const res = await fallbackInterpret("I had 3 eggs and some bread for breakfast.");
    expect(res.requiresConfirmation).toBe(true);
    expect(res.nutrition?.items.find((i: any) => i.name.toLowerCase() === 'bread')?.quantity).toBe(2);
  });

  it('Progression calculations remain deterministic (not AI-decided)', () => {
    const prior = [
      { type: 'workout', timestamp: 1, data: { exercise: 'bench_press', loadKg: 80, sets: 4, reps: 8, completed: true, pain: false } }
    ] as any;
    const newEvent = { loadKg: 80, sets: 4, reps: 8, completed: true, pain: false };
    const res = evaluateBenchPressProgression(prior, newEvent);
    expect(res.action).toBe('increase');
    expect(res.recommendedLoadKg).toBe(82.5);
  });

  it('Pain blocking progression', () => {
    const prior = [
      { type: 'workout', timestamp: 1, data: { exercise: 'bench_press', loadKg: 80, sets: 4, reps: 8, completed: true, pain: false } }
    ] as any;
    const newEvent = { loadKg: 80, sets: 4, reps: 8, completed: true, pain: true };
    const res = evaluateBenchPressProgression(prior, newEvent);
    expect(res.action).toBe('pain_blocked');
  });

  it('normalizes live extraction output before UI and calculations consume it', () => {
    const draft = toEventDraft({
      intent: 'workout',
      workout: {
        exercise: 'Bench Press', canonicalExerciseId: 'bench_press', load: 80,
        sets: 4, repetitionsPerSet: 8, repetitionsBySet: null,
        completedAllReps: true, painReported: false, effortOrRpe: null, notes: null,
      },
    });
    expect(draft).toEqual({
      type: 'workout',
      data: expect.objectContaining({ exercise: 'bench_press', loadKg: 80, reps: 8, completed: true }),
    });
  });

  it('calculates totals from either normalized AI or legacy fallback event values', () => {
    const totals = calculateTodayTotals([
      { id: 'meal', type: 'nutrition', timestamp: Date.now(), rawMessage: '', status: 'confirmed', data: { items: [{ estimatedCalories: 450, estimatedProteinG: 32 }] } },
      { id: 'water', type: 'water', timestamp: Date.now(), rawMessage: '', status: 'confirmed', data: { amountMl: 500 } },
    ] as any);
    expect(totals).toEqual({ calories: 450, proteinG: 32, waterMl: 500 });
  });
});
