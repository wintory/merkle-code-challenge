import { getBestExchange } from '../services/exchangeService'

export const routeToBestExchange = async (req, res) => {
  const btcAmount = parseFloat(req.query.amount)

  if (isNaN(btcAmount) || btcAmount <= 0) {
    return res.status(400).json({ error: 'Invalid BTC amount' })
  }

  try {
    const bestExchange = await getBestExchange(btcAmount)
    res.json(bestExchange)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exchange rates' })
  }
}
