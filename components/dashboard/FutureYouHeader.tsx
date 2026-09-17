import { Activity, Droplets, Flame } from 'lucide-react'
import styles from './FutureYouHeader.module.css'

type AiMode = 'live' | 'fallback' | 'unavailable' | null

interface FutureYouHeaderProps {
  name: string
  timeframe: string
  targetOutcome: string
  trajectoryScore: number
  aiMode: AiMode
  calories: number
  calorieTarget: number
  protein: number
  proteinTarget: number
  water: number
  waterTarget: number
}

const statusCopy: Record<Exclude<AiMode, null>, string> = {
  live: 'Coach online',
  fallback: 'Coach offline mode',
  unavailable: 'Coach reconnecting',
}

export function FutureYouHeader({
  name,
  timeframe,
  targetOutcome,
  trajectoryScore,
  aiMode,
  calories,
  calorieTarget,
  protein,
  proteinTarget,
  water,
  waterTarget,
}: FutureYouHeaderProps) {
  const score = Math.max(0, Math.min(100, Math.round(trajectoryScore)))
  const status = aiMode ? statusCopy[aiMode] : 'Future You'
  const statusClass = aiMode === 'live'
    ? `${styles.status} ${styles.statusLive}`
    : aiMode === 'unavailable'
      ? `${styles.status} ${styles.statusError}`
      : styles.status

  const metrics = [
    { label: 'Energy', value: calories, target: calorieTarget, unit: 'kcal', icon: Flame },
    { label: 'Protein', value: protein, target: proteinTarget, unit: 'g', icon: Activity },
    { label: 'Water', value: water, target: waterTarget, unit: 'ml', icon: Droplets },
  ]

  return (
    <header className={styles.shell}>
      <div className={styles.inner}>
        <div className={styles.topline}>
          <div className={styles.identity}>
            <div className={styles.mark} aria-hidden="true">FY</div>
            <div>
              <p className={styles.eyebrow}>{timeframe} horizon</p>
              <h1 className={styles.title}>Future {name}</h1>
            </div>
          </div>
          <span className={statusClass}><span className={styles.statusDot} aria-hidden="true" />{status}</span>
        </div>

        <div className={styles.journey}>
          <p className={styles.journeyCopy}>Building toward {targetOutcome}</p>
          <span className={styles.score}>{score}% trajectory</span>
          <div className={styles.meter} role="progressbar" aria-label="Today’s Future You trajectory" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}>
            <div className={styles.meterFill} style={{ width: `${score}%` }} />
          </div>
        </div>

        <div className={styles.metrics}>
          {metrics.map(({ label, value, target, unit, icon: Icon }) => (
            <section className={styles.metric} key={label} aria-label={`${label}: ${value} of ${target} ${unit}`}>
              <div className={styles.metricHead}>
                <Icon className={styles.icon} size={14} aria-hidden="true" />
                <p className={styles.label}>{label}</p>
              </div>
              <p className={styles.value}>{value} <span className={styles.unit}>/ {target} {unit}</span></p>
            </section>
          ))}
        </div>
      </div>
    </header>
  )
}
