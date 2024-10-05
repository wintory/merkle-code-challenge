import axiosInstance from 'axios'
import { describe, expect, it } from 'vitest'
import { getSymbol } from './symbol'

jest.mock('axios')

describe('getSymbol', () => {
  it('should return symbol data on successful API call', async () => {
    const mockResponse = { data: { symbol: 'ABC' } }
    axiosInstance.mockResolvedValueOnce(mockResponse)

    const symbol = await getSymbol()

    expect(axiosInstance).toHaveBeenCalledWith({
      url: '/symbols',
      method: 'GET',
    })
    expect(symbol).toEqual(mockResponse.data)
  })

  it('should handle API call error', async () => {
    const mockError = new Error('API call failed')
    axiosInstance.mockRejectedValueOnce(mockError)

    const symbol = await getSymbol()

    expect(axiosInstance).toHaveBeenCalledWith({
      url: '/symbols',
      method: 'GET',
    })
    expect(console.error).toHaveBeenCalledWith(mockError)
    expect(symbol).toBeUndefined()
  })
})
