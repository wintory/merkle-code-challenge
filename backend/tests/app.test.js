import request from 'supertest'
import app from '../src/app'

describe('App', () => {
  it('should return a 200 status code for GET /', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })

  it('should return a "This is exchange service" message for GET /', async () => {
    const response = await request(app).get('/')
    expect(response.text).toBe('This is exchange service')
  })

  it('should return an error "Invalid BTC amount" message for GET /exchange-routing', async () => {
    const response = await request(app).get('/exchange-routing')
    expect(response.text).toBe('{"message":"Invalid BTC amount"}')
  })

  it('should return a 404 status code for GET /unknown', async () => {
    const response = await request(app).get('/unknown')
    expect(response.status).toBe(404)
  })
})
