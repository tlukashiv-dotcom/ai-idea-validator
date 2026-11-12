// Dashboard blocks. Each component renders its part of the n8n JSON response.

// Badge color comes from the AI verdict; falls back to the score
const VERDICT_TONES = {
  Promising: 'good',
  'Needs work': 'mid',
  Risky: 'bad',
}

export function ScoreRing({ score = 0, verdict }) {
  const r = 52
  const c = 2 * Math.PI * r
  const value = Math.max(0, Math.min(100, Number(score) || 0))
  const tone = VERDICT_TONES[verdict] || (value >= 70 ? 'good' : value >= 45 ? 'mid' : 'bad')
  return (
    <div className="score">
      <svg viewBox="0 0 120 120" className={`ring ring--${tone}`} aria-hidden="true">
        <circle cx="60" cy="60" r={r} className="ring__track" />
        <circle
          cx="60" cy="60" r={r} className="ring__value"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <div className="score__number">{value}<span>/100</span></div>
      {verdict && <div className={`badge badge--${tone}`}>{verdict}</div>}
    </div>
  )
}

export function Card({ title, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {title && <h2 className="card__title">{title}</h2>}
      {children}
    </section>
  )
}

export function Competitors({ items = [] }) {
  if (!items.length) return null
  return (
    <Card title="Competitors">
      <div className="competitors">
        {items.map((c, i) => (
          <article key={i} className="competitor">
            <h3>
              {c.url ? <a href={c.url} target="_blank" rel="noreferrer">{c.name} ↗</a> : c.name}
            </h3>
            <p>{c.description}</p>
          </article>
        ))}
      </div>
    </Card>
  )
}

const SWOT_LABELS = {
  strengths: 'Strengths',
  weaknesses: 'Weaknesses',
  opportunities: 'Opportunities',
  threats: 'Threats',
}

export function Swot({ swot }) {
  if (!swot) return null
  return (
    <Card title="SWOT analysis">
      <div className="swot">
        {Object.entries(SWOT_LABELS).map(([key, label]) => (
          <div key={key} className={`swot__cell swot__cell--${key}`}>
            <h3>{label}</h3>
            <ul>{(swot[key] || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        ))}
      </div>
    </Card>
  )
}

const CANVAS_LABELS = [
  ['problem', 'Problem'],
  ['customer_segments', 'Customer segments'],
  ['unique_value_proposition', 'Unique value proposition'],
  ['solution', 'Solution'],
  ['channels', 'Channels'],
  ['revenue_streams', 'Revenue streams'],
  ['cost_structure', 'Cost structure'],
  ['key_metrics', 'Key metrics'],
  ['unfair_advantage', 'Unfair advantage'],
]

export function LeanCanvas({ canvas }) {
  if (!canvas) return null
  return (
    <Card title="Lean Canvas">
      <div className="canvas">
        {CANVAS_LABELS.map(([key, label]) => (
          <div key={key} className={`canvas__cell canvas__cell--${key}`}>
            <h3>{label}</h3>
            <p>{canvas[key]}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

const LEVEL_LABELS = { high: 'High', medium: 'Medium', low: 'Low' }

export function Risks({ items = [] }) {
  if (!items.length) return null
  return (
    <Card title="Risks">
      <ul className="risks">
        {items.map((r, i) => (
          <li key={i} className="risk">
            <span className={`badge badge--${r.level}`}>{LEVEL_LABELS[r.level] || r.level}</span>
            <div>
              <strong>{r.risk}</strong>
              <p>{r.mitigation}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function NextSteps({ items = [] }) {
  if (!items.length) return null
  return (
    <Card title="Next steps">
      <ol className="steps">{items.map((s, i) => <li key={i}>{s}</li>)}</ol>
    </Card>
  )
}

export function Sources({ items = [] }) {
  if (!items.length) return null
  return (
    <Card title="Sources">
      <ul className="sources">
        {items.map((s, i) => (
          <li key={i}>
            <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>
            <span>{new URL(s.url).hostname}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
