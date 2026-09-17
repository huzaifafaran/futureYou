import type { UserProfile, UserPlan } from './schemas';

/**
 * Calculates BMR using Mifflin-St Jeor Equation
 */
export function calculateBMR(weightKg: number, heightCm: number, age: number, sex: string): number {
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (sex === 'female') {
    bmr -= 161;
  } else {
    // male or prefer_not_to_say defaults to male formula
    bmr += 5;
  }
  return bmr;
}

/**
 * Calculates TDEE based on activity level
 */
export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    high: 1.725
  };
  return bmr * (multipliers[activityLevel] || 1.55);
}

/**
 * Generates a deterministic UserPlan based on the UserProfile
 */
export function generatePlan(profile: UserProfile): UserPlan {
  const bmr = calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.sex);
  const tdee = calculateTDEE(bmr, profile.activityLevel);

  let calorieTarget = tdee;
  let proteinTargetG = Math.round(profile.weightKg * 1.8); // Baseline 1.8g/kg
  let waterTargetMl = 2500 + (profile.activityLevel === 'high' ? 1000 : 500);
  let rationale = `Estimated maintenance (TDEE): ${Math.round(tdee)} kcal based on your activity level. `;

  if (profile.primaryGoal === 'fat_loss') {
    calorieTarget = tdee - 500;
    proteinTargetG = Math.round(profile.weightKg * 2.2); // Higher protein to preserve mass
    rationale += `Goal: Fat Loss. Daily target set to ${Math.round(calorieTarget)} kcal (500 kcal deficit).`;
  } else if (profile.primaryGoal === 'muscle_gain') {
    calorieTarget = tdee + 300;
    proteinTargetG = Math.round(profile.weightKg * 2.0);
    rationale += `Goal: Muscle Gain. Daily target set to ${Math.round(calorieTarget)} kcal (300 kcal controlled surplus).`;
  } else {
    rationale += `Goal: Maintenance. Daily target set to ${Math.round(calorieTarget)} kcal.`;
  }

  // Generate basic workout program based on training days
  const workoutProgram = [];
  if (profile.trainingDaysPerWeek <= 3) {
    workoutProgram.push({
      name: 'Full Body A', focus: 'Push/Pull/Legs',
      exercises: [
        { name: 'Squat', sets: 3, reps: '8-10', restSecs: 120 },
        { name: 'Bench Press', sets: 3, reps: '8-10', restSecs: 120 },
        { name: 'Barbell Row', sets: 3, reps: '8-10', restSecs: 120 },
      ]
    });
    if (profile.trainingDaysPerWeek >= 2) {
      workoutProgram.push({
        name: 'Full Body B', focus: 'Hinge/Push/Pull',
        exercises: [
          { name: 'Deadlift', sets: 3, reps: '6-8', restSecs: 120 },
          { name: 'Overhead Press', sets: 3, reps: '8-10', restSecs: 120 },
          { name: 'Pull-up', sets: 3, reps: 'AMRAP', restSecs: 120 },
        ]
      });
    }
  } else {
    workoutProgram.push({
      name: 'Upper Body', focus: 'Push/Pull',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', restSecs: 120 },
        { name: 'Barbell Row', sets: 4, reps: '8-10', restSecs: 120 },
      ]
    });
    workoutProgram.push({
      name: 'Lower Body', focus: 'Legs',
      exercises: [
        { name: 'Squat', sets: 4, reps: '8-10', restSecs: 120 },
        { name: 'Romanian Deadlift', sets: 3, reps: '10-12', restSecs: 120 },
      ]
    });
  }

  return {
    calorieTarget: Math.round(calorieTarget),
    proteinTargetG,
    waterTargetMl,
    calorieRationale: rationale,
    weightTrendTargetKgPerWeek: profile.primaryGoal === 'fat_loss' ? -0.5 : (profile.primaryGoal === 'muscle_gain' ? 0.25 : 0),
    workoutProgram,
    progressionRules: [
      "If you hit the top of the rep range for all sets cleanly, increase load by 2.5kg next session."
    ]
  };
}
