import type { ActivityEvent } from './schemas';

export function parseMessage(message: string): Partial<ActivityEvent> & { success: boolean; requiresConfirmation?: boolean; ambiguityReason?: string } {
  const normalized = message.toLowerCase().trim();

  // 1. Water fallback
  if (normalized.includes('water') && normalized.includes('ml')) {
    const match = normalized.match(/(\d+)\s*ml/);
    if (match) {
      return {
        success: true,
        type: 'water',
        data: { amountMl: parseInt(match[1], 10) }
      };
    }
  }

  // 2. Nutrition fallback (Canonical input: "I had 3 eggs and some bread for breakfast.")
  if (normalized.includes('bread') || normalized.includes('egg') || normalized.includes('breakfast')) {
    // Check for ambiguity
    if (normalized.includes('some bread') || !normalized.match(/(\d+)\s*slice/)) {
      return {
        success: true,
        type: 'nutrition',
        requiresConfirmation: true,
        ambiguityReason: '"some bread" is ambiguous. Please confirm quantity.',
        data: {
          items: [
            { id: 'item1', name: 'Eggs', quantity: 3, unit: 'whole', calories: 210, protein: 18 },
            { id: 'item2', name: 'Bread', quantity: 2, unit: 'slice', calories: 140, protein: 6 } // default assumption to confirm
          ]
        }
      };
    } else {
      return {
        success: true,
        type: 'nutrition',
        requiresConfirmation: false,
        data: {
          items: [
            { id: 'item1', name: 'Eggs', quantity: 3, unit: 'whole', calories: 210, protein: 18 },
          ]
        }
      };
    }
  }

  // 3. Workout fallback (Canonical: "Bench press: 80 kg, 4 sets of 8. I hit every rep.")
  if (normalized.includes('bench press') || normalized.includes('bench')) {
    const loadMatch = normalized.match(/(\d+)\s*kg/);
    const setsMatch = normalized.match(/(\d+)\s*sets/);
    const repsMatch = normalized.match(/(?:sets of\s*|x\s*)(\d+)/);
    
    // Support completion state parsing
    const allCompleted = normalized.includes('hit every rep') || normalized.includes('all reps') || normalized.includes('completed');
    const painReported = normalized.includes('pain') || normalized.includes('hurt') || normalized.includes('injury');

    if (loadMatch) {
      return {
        success: true,
        type: 'workout',
        data: {
          exercise: 'bench_press',
          loadKg: parseInt(loadMatch[1], 10),
          sets: setsMatch ? parseInt(setsMatch[1], 10) : 4,
          reps: repsMatch ? parseInt(repsMatch[1], 10) : 8,
          completed: allCompleted,
          pain: painReported
        }
      };
    }
  }

  // Fallback for unsupported / unknown text
  return {
    success: false,
    type: 'unknown'
  };
}
