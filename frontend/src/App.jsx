import { useEffect, useState } from 'react'
import { validateIdea } from './api'
import {
  ScoreRing, Card, Competitors, Swot, LeanCanvas, Risks, NextSteps, Sources,
} from './components'

const EXAMPLES = [
  { idea: 'Сервіс підписки на каву для офісів', market: 'Україна' },
  { idea: 'Онлайн-школа програмування для дітей', market: 'Польща' },
  { idea: 'Мобільний застосунок для обміну речами між сусідами', market: 'Німеччина' },
]

const LOADING_STEPS = [
  'Шукаю конкурентів в інтернеті…',
  'Аналізую ринок…',
  'Складаю SWOT і Lean Canvas…',
  'Оцінюю ризики…',
]

function Loading() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="loading" role="status">
      <div className="spinner" />
      <p>{LOADING_STEPS[step]}</p>
    </div>
  )
}

export default function App() {
  const [idea, setIdea] = useState('')
  const [market, setMarket] = useState('Україна')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (idea.trim().length < 10) {
      setError('Опишіть ідею детальніше (хоча б 10 символів).')
      setStatus('error')
      return
    }
    setStatus('loading')
    setError('')
    setResult(null)
    try {
      const data = await validateIdea({ idea: idea.trim(), market: market.trim() })
      setResult(data)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__tag">AI Business Idea Validator</div>
        <h1>Перевірте бізнес-ідею за 30 секунд</h1>
        <p>AI знайде конкурентів в інтернеті, зробить SWOT, Lean Canvas, оцінить ризики та життєздатність ідеї.</p>
      </header>

      <form className="form card" onSubmit={handleSubmit}>
        <label>
          Ваша ідея
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Наприклад: сервіс підписки на свіжу каву для офісів з автоматичним поповненням"
            rows={3}
          />
        </label>
        <label>
          Ринок
          <input value={market} onChange={(e) => setMarket(e.target.value)} placeholder="Країна або місто" />
        </label>
        <div className="form__examples">
          <span>Приклади:</span>
          {EXAMPLES.map((ex) => (
            <button type="button" key={ex.idea} className="chip"
              onClick={() => { setIdea(ex.idea); setMarket(ex.market) }}>
              {ex.idea}
            </button>
          ))}
        </div>
        <button className="primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Аналізую…' : 'Перевірити ідею'}
        </button>
      </form>

      {status === 'loading' && <Loading />}
      {status === 'error' && <div className="error">{error}</div>}

      {status === 'done' && result && (
        <main className="report">
          <Card className="summary">
            <ScoreRing score={result.score} verdict={result.verdict} />
            <div>
              <h2 className="card__title">Підсумок</h2>
              <p>{result.summary}</p>
            </div>
          </Card>
          <Competitors items={result.competitors} />
          <Swot swot={result.swot} />
          <LeanCanvas canvas={result.lean_canvas} />
          <div className="two-col">
            <Risks items={result.risks} />
            <NextSteps items={result.next_steps} />
          </div>
          <Sources items={result.sources} />
        </main>
      )}

      <footer className="footer">Побудовано на n8n · Gemini · Tavily · React</footer>
    </div>
  )
}
