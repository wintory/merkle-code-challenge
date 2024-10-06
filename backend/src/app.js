import express from 'express'
import exchangeRoute from './routes/exchangeRoutes'

const app = express()

app.get('/', (_, res) => {
  res.send('This is exchange service')
})

app.get('/exchange-routing', exchangeRoute)

export default app
