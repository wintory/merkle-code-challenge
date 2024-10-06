import { getBinanceSymbolPrice } from './binanceService'
import { getCoinbaseSymbolPrice } from './coinbaseService'

export const getBestExchangeToBuyBTC = async (btcAmount) => {
  const symbol = 'BTCUSDT'
  const [binancePrice, coinbasePrice] = await Promise.all([
    getBinanceSymbolPrice({ symbol }),
    getCoinbaseSymbolPrice({ symbol: 'BTC-USDT' }),
  ])

  const binanceCost = btcAmount * binancePrice
  const coinbaseCost = btcAmount * coinbasePrice

  return binanceCost < coinbaseCost
    ? { btcAmount, usdAmount: binanceCost, exchange: 'binance' }
    : { btcAmount, usdAmount: coinbaseCost, exchange: 'coinbase' }
}
