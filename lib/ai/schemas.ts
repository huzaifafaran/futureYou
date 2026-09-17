import { z } from 'zod';

export const InterpretationSchema = z.object({
  intent: z.enum(['nutrition', 'water', 'workout', 'question', 'correction', 'check_in', 'unknown']),
  confidence: z.number(),
  requiresConfirmation: z.boolean(),
  requiresClarification: z.boolean(),
  clarificationQuestion: z.string().nullable(),
  sourceMessage: z.string(),
  nutrition: z.object({
    meal: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'unknown']),
    items: z.array(z.object({
      name: z.string(),
      quantity: z.number().nullable(),
      unit: z.string(),
      estimatedCanonicalName: z.string(),
      estimatedCalories: z.number().nullable(),
      estimatedProteinG: z.number().nullable(),
      ambiguityReason: z.string().nullable(),
    }))
  }).nullable(),
  water: z.object({
    amount: z.number(),
    unit: z.string(),
    normalizedMillilitres: z.number(),
  }).nullable(),
  workout: z.object({
    exercise: z.string(),
    canonicalExerciseId: z.string(),
    load: z.number().nullable(),
    loadUnit: z.string().nullable(),
    sets: z.number().nullable(),
    repetitionsPerSet: z.number().nullable(),
    repetitionsBySet: z.array(z.number()).nullable(),
    completedAllReps: z.boolean(),
    painReported: z.boolean(),
    effortOrRpe: z.number().nullable(),
    notes: z.string().nullable(),
  }).nullable()
});

export const CoachingResponseSchema = z.object({
  message: z.string(),
  nextAction: z.string().nullable(),
  responseType: z.enum(['progression', 'maintenance', 'safety', 'answer', 'encouragement']),
  safetyFlag: z.enum(['none', 'pain', 'injury', 'eating_disorder', 'medical'])
});

export const IntentClassificationSchema = z.object({
  classification: z.enum(['log', 'correction', 'question', 'conversation']),
  confidence: z.number().min(0).max(1)
});
