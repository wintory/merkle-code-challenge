import * as BinanceService from './binanceService'
import * as CoinbaseService from './coinbaseService'
import { getBestExchangeToBuyBTC } from './exchangeService'

describe('getBestExchangeToBuyBTC', () => {
  const mockedGetBinanceSymbolPrice = jest
    .spyOn(BinanceService, 'getBinanceSymbolPrice')
    .mockImplementation(jest.fn())
  const mockedGetCoinbaseSymbolPrice = jest
    .spyOn(CoinbaseService, 'getCoinbaseSymbolPrice')
    .mockImplementation(jest.fn())

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return the correct result when binance is cheaper', async () => {
    const btcAmount = 1
    const binancePrice = 50000
    const coinbasePrice = 51000

    mockedGetBinanceSymbolPrice.mockResolvedValue(binancePrice)
    mockedGetCoinbaseSymbolPrice.mockResolvedValue(coinbasePrice)

    const result = await getBestExchangeToBuyBTC(btcAmount)

    expect(mockedGetBinanceSymbolPrice).toHaveBeenCalledWith({
      symbol: 'BTCUSDT',
    })
    expect(mockedGetCoinbaseSymbolPrice).toHaveBeenCalledWith({
      symbol: 'BTC-USDT',
    })
    expect(result).toEqual({
      btcAmount,
      usdAmount: btcAmount * binancePrice,
      exchange: 'binance',
    })
  })

  it('should return the correct result when coinbase is cheaper', async () => {
    const btcAmount = 1
    const binancePrice = 50000
    const coinbasePrice = 40000

    mockedGetBinanceSymbolPrice.mockResolvedValue(binancePrice)
    mockedGetCoinbaseSymbolPrice.mockResolvedValue(coinbasePrice)

    const result = await getBestExchangeToBuyBTC(btcAmount)

    expect(mockedGetBinanceSymbolPrice).toHaveBeenCalledWith({
      symbol: 'BTCUSDT',
    })
    expect(mockedGetCoinbaseSymbolPrice).toHaveBeenCalledWith({
      symbol: 'BTC-USDT',
    })
    expect(result).toEqual({
      btcAmount,
      usdAmount: btcAmount * coinbasePrice,
      exchange: 'coinbase',
    })
  })

  it('should throw error when coinbasePrice is undefined', async () => {
    const btcAmount = 1
    const binancePrice = 50000
    const coinbasePrice = undefined

    mockedGetBinanceSymbolPrice.mockResolvedValue(binancePrice)
    mockedGetCoinbaseSymbolPrice.mockResolvedValue(coinbasePrice)

    expect(async () => {
      await getBestExchangeToBuyBTC(btcAmount)
    }).rejects.toThrow()
  })

  it('should throw error when binancePrice is undefined', async () => {
    const btcAmount = 1
    const binancePrice = undefined
    const coinbasePrice = 47000

    mockedGetBinanceSymbolPrice.mockResolvedValue(binancePrice)
    mockedGetCoinbaseSymbolPrice.mockResolvedValue(coinbasePrice)

    expect(async () => {
      await getBestExchangeToBuyBTC(btcAmount)
    }).rejects.toThrow()
  })
})
