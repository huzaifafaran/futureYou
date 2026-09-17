import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().default(30),
  sex: z.enum(['male', 'female', 'prefer_not_to_say']).default('male'),
  heightCm: z.number(),
  weightKg: z.number(),
  primaryGoal: z.enum(['fat_loss', 'muscle_gain', 'maintenance']),
  targetWeightKg: z.number().optional(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'high']).default('moderate'),
  trainingDaysPerWeek: z.number().default(3),
  trainingLocation: z.enum(['home', 'gym', 'both']).default('gym'),
  equipment: z.array(z.string()).default([]),
  dietaryPreferences: z.array(z.string()).default([]),
  injuriesLimitations: z.array(z.string()).default([])
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const WorkoutDaySchema = z.object({
  name: z.string(),
  focus: z.string(),
  exercises: z.array(z.object({
    name: z.string(),
    sets: z.number(),
    reps: z.string(),
    restSecs: z.number(),
  }))
});

export const UserPlanSchema = z.object({
  calorieTarget: z.number(),
  proteinTargetG: z.number(),
  waterTargetMl: z.number(),
  calorieRationale: z.string(),
  weightTrendTargetKgPerWeek: z.number().optional(),
  workoutProgram: z.array(WorkoutDaySchema),
  progressionRules: z.array(z.string())
});

export type UserPlan = z.infer<typeof UserPlanSchema>;

export const ActivityEventSchema = z.object({
  id: z.string(),
  type: z.enum(['nutrition', 'water', 'workout', 'unknown']),
  timestamp: z.number(),
  rawMessage: z.string(),
  status: z.enum(['draft', 'confirmed', 'rejected']),
  data: z.any().optional(), // Specific per type
});

export type ActivityEvent = z.infer<typeof ActivityEventSchema>;

export const FutureSelfProfileSchema = z.object({
  timeframe: z.string(),
  identity: z.array(z.string()),
  targetOutcome: z.string(),
  values: z.array(z.string()),
  userWrittenNotes: z.string().optional()
});

export type FutureSelfProfile = z.infer<typeof FutureSelfProfileSchema>;

export const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  timestamp: z.number()
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const AppStateSchema = z.object({
  version: z.number(),
  profile: UserProfileSchema.nullable(),
  plan: UserPlanSchema.nullable().default(null),
  events: z.array(ActivityEventSchema),
  messages: z.array(ChatMessageSchema).optional().default([]),
  futureSelf: FutureSelfProfileSchema.nullable(),
  seedApplied: z.boolean(),
});
