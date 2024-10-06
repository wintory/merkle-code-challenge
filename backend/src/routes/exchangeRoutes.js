import express from 'express'
import { routeToBestExchange } from '../controllers/exchangeController'

const router = express.Router()

router.get('/exchange-routing', routeToBestExchange)

export default router
