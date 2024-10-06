import axios from 'axios'

export const getCoinbaseSymbolPrice = async ({ symbol }) => {
  try {
    const response = await axios.get(
      `${process.env.COINBASE_API_URL || 'https://api.coinbase.com'}/v2/prices/${symbol}/spot`
    )
    const price = parseFloat(response.data.data.amount)

    if (isNaN(price)) {
      throw new Error('Invalid price data from Coinbase')
    }

    return price
  } catch (error) {
    console.error('Error fetching price from Coinbase:', error.message)
    throw new Error('Failed to fetch price from Coinbase')
  }
}
