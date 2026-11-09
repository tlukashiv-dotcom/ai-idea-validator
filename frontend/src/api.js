const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5678/webhook/validate-idea'

export async function validateIdea({ idea, market }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 120_000)
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, market }),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`Сервер відповів помилкою ${res.status}`)
    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Аналіз триває задовго. Спробуйте ще раз.')
    if (err instanceof TypeError) throw new Error('Не вдалося з’єднатися з сервером. Чи запущений n8n і чи увімкнено CORS?')
    throw err
  } finally {
    clearTimeout(timer)
  }
}
