// Saved real reports for demo mode (no backend).
// Each JSON is an n8n webhook response saved with curl.
import coffee from './coffee-offices-ua.json'
import kidsCoding from './kids-coding-pl.json'
import swapApp from './swap-app-de.json'

export const EXAMPLES = [
  { id: 'coffee', idea: 'Coffee subscription service for offices', market: 'Ukraine', report: coffee },
  { id: 'kids-coding', idea: 'Online coding school for kids', market: 'Poland', report: kidsCoding },
  { id: 'swap-app', idea: 'Mobile app for swapping items between neighbors', market: 'Germany', report: swapApp },
]
