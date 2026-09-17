import { type ActivityEvent } from './schemas';

export function calculateTrajectoryScore(events: ActivityEvent[], currentScore: number): number {
  let newScore = currentScore;
  
  const today = new Date().setHours(0, 0, 0, 0);
  const todaysEvents = events.filter(e => e.timestamp >= today && e.status === 'confirmed');
  
  todaysEvents.forEach(e => {
    if (e.type === 'water' && e.data?.amountMl >= 500) {
      newScore += 5;
    }
    if (e.type === 'workout') {
      if (e.data?.completed) {
        newScore += 10;
      } else {
        newScore += 2;
      }
    }
    if (e.type === 'nutrition') {
      newScore += 5;
    }
  });

  return Math.min(100, Math.max(0, newScore));
}
