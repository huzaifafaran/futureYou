import { type ActivityEvent } from './schemas';

export interface ProgressionResult {
  action: 'increase' | 'maintain' | 'deload' | 'insufficient_evidence' | 'pain_blocked';
  recommendedLoadKg: number;
  reason: string;
}

export function evaluateBenchPressProgression(
  recentSessions: ActivityEvent[],
  currentPerformance: { sets: number, reps: number, completed: boolean, pain: boolean, loadKg: number }
): ProgressionResult {
  
  // Rule 1: Pain explicitly blocks progression
  if (currentPerformance.pain) {
    return {
      action: 'pain_blocked',
      recommendedLoadKg: currentPerformance.loadKg,
      reason: 'You reported pain. Safety first—maintain the load and consult a professional if pain persists.'
    };
  }

  // Rule 2: Incomplete reps prevents progression
  if (!currentPerformance.completed || currentPerformance.sets < 4 || currentPerformance.reps < 8) {
    return {
      action: 'maintain',
      recommendedLoadKg: currentPerformance.loadKg,
      reason: "You didn't hit all reps. Let's build consistency at this weight before moving up."
    };
  }

  // Canonical POC rule: 80kg -> 82.5kg after 2 consecutive successful sessions.
  // We include the current performance as a successful session.
  const priorSuccessful = recentSessions.filter(
    s =>
      (s.data?.exercise === 'bench_press' || s.data?.canonicalExerciseId === 'bench_press') &&
      (s.data?.loadKg ?? s.data?.load) === currentPerformance.loadKg &&
      s.data?.completed === true &&
      s.data?.pain === false &&
      s.data?.sets >= 4 &&
      s.data?.reps >= 8
  );

  // If current is successful and we have at least 1 prior successful session -> total 2
  if (priorSuccessful.length >= 1) {
    return {
      action: 'increase',
      recommendedLoadKg: currentPerformance.loadKg + 2.5,
      reason: `You completed 4×8 at ${currentPerformance.loadKg} kg across at least two sessions without pain. Next session, try ${currentPerformance.loadKg + 2.5} kg.`
    };
  }

  // Not enough evidence for progression
  return {
    action: 'insufficient_evidence',
    recommendedLoadKg: currentPerformance.loadKg,
    reason: "Great set. Let's see one more session like this before we add weight."
  };
}
