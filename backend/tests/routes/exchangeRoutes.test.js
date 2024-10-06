import request from 'supertest'
import app from '../../src/app'
import * as binanceService from '../../src/services/binanceService'
import * as coinbaseService from '../../src/services/coinbaseService'

describe('GET /exchange-routing', () => {
  // Mock the Binance and Coinbase services
  beforeEach(() => {
    jest.clearAllMocks() // Clear any previous mocks between tests
  })

  test('should return the best exchange based on the price comparison', async () => {
    // Mock Binance and Coinbase prices
    jest.spyOn(binanceService, 'getBinanceSymbolPrice').mockResolvedValue(20000)
    jest
      .spyOn(coinbaseService, 'getCoinbaseSymbolPrice')
      .mockResolvedValue(21000)

    // Send a request to the route
    const response = await request(app).get('/exchange-routing?amount=1')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      btcAmount: 1,
      usdAmount: 20000,
      exchange: 'binance',
    })
  })

  test('should return a 400 error if the BTC amount is invalid', async () => {
    const response = await request(app).get('/exchange-routing?amount=invalid')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: 'Invalid BTC amount',
    })
  })

  test('should return a 500 error if fetching prices fails', async () => {
    jest
      .spyOn(binanceService, 'getBinanceSymbolPrice')
      .mockRejectedValue(new Error('Binance API Error'))

    const response = await request(app).get('/exchange-routing?amount=1')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Error get exchange rates',
    })
  })
})
