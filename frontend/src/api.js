// Modes:
//  - live (default): requests go to the n8n webhook
//  - demo (VITE_DEMO_MODE=true): shows saved real reports, no backend needed
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5678/webhook/validate-idea'

export async function validateIdea({ idea, market }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 120_000) // AI analysis can take up to 2 min

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, market }),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`Server responded with error ${res.status}`)
    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('The analysis is taking too long. Please try again.')
    if (err instanceof TypeError) throw new Error('Could not reach the server. Is n8n running and is CORS enabled?')
    throw err
  } finally {
    clearTimeout(timer)
  }
}
