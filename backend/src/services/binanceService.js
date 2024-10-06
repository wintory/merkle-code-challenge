import axios from 'axios'

export const getBinanceSymbolPrice = async ({ symbol }) => {
  try {
    const response = await axios.get(
      `${process.env.BINANCE_API_URL}/api/v3/ticker/price?symbol=${symbol}`
    )
    const price = parseFloat(response.data.price)

    if (isNaN(price)) {
      throw new Error('Invalid price data from Binance')
    }

    return price
  } catch (error) {
    console.error('Error fetching price from Binance:', error.message)
    throw new Error('Failed to fetch price from Binance')
  }
}
