import { routeToBestExchange } from '../../src/controllers/exchangeController'
import { getBestExchangeToBuyBTC } from '../../src/services/exchangeService'

jest.mock('../../src/services/exchangeService', () => ({
  getBestExchangeToBuyBTC: jest.fn(),
}))

describe('routeToBestExchange', () => {
  let req, res

  beforeEach(() => {
    req = {
      query: {
        amount: '1.5',
      },
    }
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the best exchange when BTC amount is valid', async () => {
    const bestExchange = {
      exchange: 'Coinbase',
      rate: 50000,
    }
    getBestExchangeToBuyBTC.mockResolvedValue(bestExchange)

    await routeToBestExchange(req, res)

    expect(getBestExchangeToBuyBTC).toHaveBeenCalledWith(1.5)
    expect(res.json).toHaveBeenCalledWith(bestExchange)
  })

  it('should return 400 status with error message when BTC amount is invalid', async () => {
    req.query.amount = 'invalid'

    await routeToBestExchange(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid BTC amount' })
  })

  it('should return 500 status with error message when getBestExchangeToBuyBTC throws an error', async () => {
    const errorMessage = 'Error get exchange rates'
    getBestExchangeToBuyBTC.mockRejectedValue(new Error(errorMessage))

    await routeToBestExchange(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
  })
})
