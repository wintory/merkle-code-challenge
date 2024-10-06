import axios from 'axios'
import { getCoinbaseSymbolPrice } from '../../src/services/coinbaseService'

describe('getCoinbaseSymbolPrice', () => {
  const mockedAxios = jest.spyOn(axios, 'get')

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    process.env.COINBASE_API_URL = 'https://api.coinbase.com'
  })

  it('should return the correct price when API call is successful', async () => {
    const mockResponse = {
      data: {
        data: {
          amount: '50000',
        },
      },
    }
    const symbol = 'BTC-USDT'
    mockedAxios.mockResolvedValue(mockResponse)

    const result = await getCoinbaseSymbolPrice({ symbol })

    expect(mockedAxios).toHaveBeenCalledWith(
      'https://api.coinbase.com/v2/prices/BTC-USDT/spot'
    )
    expect(result).toEqual(50000)
  })

  it('should throw an error when API call fails', async () => {
    const symbol = 'BTC-USDT'
    const mockError = new Error('API call failed')
    mockedAxios.mockRejectedValue(mockError)

    await expect(getCoinbaseSymbolPrice({ symbol })).rejects.toThrow(
      'Failed to fetch price from Coinbase'
    )
  })

  it('should throw an error when price data is invalid', async () => {
    const symbol = 'BTC-USDT'
    const mockResponse = {
      data: {
        data: {
          amount: 'invalid',
        },
      },
    }
    mockedAxios.mockResolvedValue(mockResponse)

    await expect(getCoinbaseSymbolPrice({ symbol })).rejects.toThrow(
      'Failed to fetch price from Coinbase'
    )
  })
})
