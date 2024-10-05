import axios from 'axios'
import { describe, expect, it } from 'vitest'
import { DEFAULT_BLOCKCHAIN_URL } from '../constants'
import { axiosInstance } from './index'

describe('axiosInstance', () => {
  it('should have the correct baseURL', () => {
    expect(axiosInstance.defaults.baseURL).toBe(
      import.meta.env.VITE_REACT_APP_API_URL || DEFAULT_BLOCKCHAIN_URL
    )
  })

  it('should have the correct headers', () => {
    expect(axiosInstance.defaults.headers['Content-Type']).toBe(
      'application/json'
    )
    expect(axiosInstance.defaults.headers.timeout).toBe(30000)
  })

  it('should be an instance of axios', () => {
    expect(axiosInstance).toBeInstanceOf(axios)
  })
})
