import axios from 'axios'
import { getBinanceSymbolPrice } from '../../src/services/binanceService'

describe('getBinanceSymbolPrice', () => {
  const mockedAxios = jest.spyOn(axios, 'get')

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    process.env.BINANCE_API_URL = 'https://api.binance.com'
  })

  it('should return the correct price when API call is successful', async () => {
    const mockResponse = {
      data: {
        price: '50000',
      },
    }
    const symbol = 'BTCUSDT'
    mockedAxios.mockResolvedValue(mockResponse)

    const result = await getBinanceSymbolPrice({ symbol })

    expect(mockedAxios).toHaveBeenCalledWith(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    )
    expect(result).toEqual(50000)
  })

  it('should throw an error when API call fails', async () => {
    const symbol = 'BTC-USDT'
    const mockError = new Error('API call failed')
    mockedAxios.mockRejectedValue(mockError)

    await expect(getBinanceSymbolPrice({ symbol })).rejects.toThrow(
      'Failed to fetch price from Binance'
    )
  })

  it('should throw an error when price data is invalid', async () => {
    const symbol = 'BTC-USDT'
    const mockResponse = {}
    mockedAxios.mockResolvedValue(mockResponse)

    await expect(getBinanceSymbolPrice({ symbol })).rejects.toThrow(
      'Failed to fetch price from Binance'
    )
  })
})
