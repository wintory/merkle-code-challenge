import { getBinanceSymbolPrice } from './binanceService'
import { getCoinbaseSymbolPrice } from './coinbaseService'

export const getBestExchangeToBuyBTC = async (btcAmount) => {
  try {
    const symbol = 'BTCUSDT'
    const [binancePrice, coinbasePrice] = await Promise.all([
      getBinanceSymbolPrice({ symbol }),
      getCoinbaseSymbolPrice({ symbol: 'BTC-USDT' }),
    ])
    const binanceCost = btcAmount * binancePrice
    const coinbaseCost = btcAmount * coinbasePrice

    if (isNaN(binanceCost) || isNaN(coinbaseCost)) {
      throw new Error('Failed to fetch price from exchange')
    }

    return binanceCost < coinbaseCost
      ? { btcAmount, usdAmount: binanceCost, exchange: 'binance' }
      : { btcAmount, usdAmount: coinbaseCost, exchange: 'coinbase' }
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message)
    throw new Error(error.message)
  }
}
