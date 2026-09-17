import type { ActivityEvent } from './schemas';

type Interpretation = Record<string, any>;

/** Converts the AI's structured response into the stable event format used by the app. */
export function toEventDraft(result: Interpretation) {
  if (result.intent === 'nutrition' && result.nutrition) {
    return {
      type: 'nutrition' as const,
      data: {
        meal: result.nutrition.meal,
        items: result.nutrition.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          estimatedCanonicalName: item.estimatedCanonicalName,
          estimatedCalories: item.estimatedCalories,
          estimatedProteinG: item.estimatedProteinG,
          ambiguityReason: item.ambiguityReason,
        })),
      },
    };
  }

  if (result.intent === 'water' && result.water) {
    return { type: 'water' as const, data: result.water };
  }

  if (result.intent === 'workout' && result.workout) {
    const workout = result.workout;
    return {
      type: 'workout' as const,
      data: {
        exercise: workout.canonicalExerciseId || workout.exercise,
        exerciseName: workout.exercise,
        loadKg: workout.load,
        sets: workout.sets,
        reps: workout.repetitionsPerSet,
        repetitionsBySet: workout.repetitionsBySet,
        completed: workout.completedAllReps,
        pain: workout.painReported,
        effortOrRpe: workout.effortOrRpe,
        notes: workout.notes,
      },
    };
  }

  return null;
}

export function calculateTodayTotals(events: ActivityEvent[], timestamp = Date.now()) {
  const startOfToday = new Date(timestamp).setHours(0, 0, 0, 0);
  return events
    .filter((event) => event.status === 'confirmed' && event.timestamp >= startOfToday)
    .reduce(
      (totals, event) => {
        if (event.type === 'nutrition') {
          for (const item of event.data?.items ?? []) {
            totals.calories += Number(item.estimatedCalories ?? item.calories ?? 0);
            totals.proteinG += Number(item.estimatedProteinG ?? item.protein ?? 0);
          }
        }
        if (event.type === 'water') {
          totals.waterMl += Number(event.data?.normalizedMillilitres ?? event.data?.amountMl ?? 0);
        }
        return totals;
      },
      { calories: 0, proteinG: 0, waterMl: 0 },
    );
}
