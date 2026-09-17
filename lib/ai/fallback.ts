import { parseMessage } from '../parser';

export async function fallbackInterpret(message: string) {
  const result = parseMessage(message);
  
  if (!result.success) {
    return {
      intent: 'unknown',
      confidence: 0,
      requiresConfirmation: false,
      requiresClarification: true,
      clarificationQuestion: "I didn't quite catch that. Try logging '3 eggs' or 'Bench press: 80 kg, 4 sets of 8'.",
      sourceMessage: message,
      nutrition: null,
      water: null,
      workout: null
    };
  }
  
  return {
    intent: result.type,
    confidence: 1,
    requiresConfirmation: result.requiresConfirmation || false,
    requiresClarification: false,
    clarificationQuestion: result.ambiguityReason || null,
    sourceMessage: message,
    nutrition: result.type === 'nutrition' ? { 
      meal: 'unknown', 
      items: result.data?.items.map((i: any) => ({ 
        name: i.name,
        quantity: i.quantity,
        unit: i.unit,
        ambiguityReason: result.ambiguityReason || null, 
        estimatedCanonicalName: i.name 
      })) || [] 
    } : null,
    water: result.type === 'water' ? { amount: result.data?.amountMl || 0, unit: 'ml', normalizedMillilitres: result.data?.amountMl || 0 } : null,
    workout: result.type === 'workout' ? {
      exercise: result.data?.exercise || 'unknown',
      canonicalExerciseId: result.data?.exercise || 'unknown',
      load: result.data?.loadKg || null,
      loadUnit: 'kg',
      sets: result.data?.sets || null,
      repetitionsPerSet: result.data?.reps || null,
      repetitionsBySet: null,
      completedAllReps: result.data?.completed || false,
      painReported: result.data?.pain || false,
      effortOrRpe: null,
      notes: null
    } : null
  };
}

export async function fallbackCoach(context: any) {
  return {
    message: context.deterministicResult?.reason || "Consistency builds the future. Every log counts.",
    nextAction: "Keep logging to build your trajectory.",
    responseType: "encouragement",
    safetyFlag: context.recentEvent?.data?.painReported ? "pain" : "none"
  };
}
