import { describe, expect, it } from 'vitest'
import * as axiosInstance from '.'
import { getSymbol } from './symbol'

describe('getSymbol', () => {
  const mockAxios = vi.spyOn(axiosInstance, 'default')

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return symbol data on successful API call', async () => {
    const mockResponse = { data: { test: 'testSymbol' } }
    const mockFn = vi.fn()
    mockAxios.mockImplementationOnce(mockFn.mockReturnValueOnce(mockResponse))

    const response = await getSymbol()

    expect(mockFn).toHaveBeenCalledWith({
      url: '/symbols',
      method: 'GET',
    })
    expect(response).toEqual(mockResponse.data)
  })

  it('should handle API call error', async () => {
    const mockFn = vi.fn()
    mockAxios.mockImplementationOnce(
      mockFn.mockReturnValueOnce(Promise.reject('error'))
    )

    const response = await getSymbol()

    expect(mockFn).toHaveBeenCalledWith({
      url: '/symbols',
      method: 'GET',
    })
    expect(response).toEqual('error')
  })
})
