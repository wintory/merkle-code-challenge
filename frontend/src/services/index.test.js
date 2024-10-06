import axiosMockAdapter from 'axios-mock-adapter'
import axiosInstance from '.'

describe('axiosInstance', () => {
  let mock

  beforeEach(() => {
    mock = new axiosMockAdapter(axiosInstance)
  })

  afterEach(() => {
    mock.restore()
  })

  it('should make a successful GET request', async () => {
    const mockResponse = { data: { symbol: 'test' } }
    mock.onGet('/symbol').reply(200, mockResponse)

    const response = await axiosInstance.get('/symbol')

    expect(response.status).toBe(200)
    expect(response.data).toEqual(mockResponse)
  })

  it('should handle a 404 error', async () => {
    mock.onGet('/undefined-symbol').reply(404)

    try {
      await axiosInstance.get('/undefined-symbol')
    } catch (error) {
      expect(error.response.status).toBe(404)
    }
  })

  it('should post data successfully', async () => {
    const postData = { symbol: 'USDC' }
    const mockResponse = { data: { symbol: 'USDC' } }
    mock.onPost('/post-test').reply(200, mockResponse)

    const response = await axiosInstance.post('/post-test', postData)

    expect(response.status).toBe(200)
    expect(response.data).toEqual(mockResponse)
  })
})
