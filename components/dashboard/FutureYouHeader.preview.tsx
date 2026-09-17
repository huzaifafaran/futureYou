import { FutureYouHeader } from './FutureYouHeader'

/** Non-production visual fixture for header states. */
export default function FutureYouHeaderPreview() {
  return (
    <main>
      <FutureYouHeader
        name="Alex"
        timeframe="12 months"
        targetOutcome="a healthier state through sustainable habits"
        trajectoryScore={45}
        aiMode="live"
        calories={840}
        calorieTarget={3113}
        protein={48}
        proteinTarget={172}
        water={500}
        waterTarget={3000}
      />
    </main>
  )
}
