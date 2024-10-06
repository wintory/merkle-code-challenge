import express from 'express'
import exchangeRoute from './routes/exchangeRoutes'


const app = express();

app.get('/', (req, res) => {
    res.send('This is exchange service')
});

app.get('/exchange-routing', exchangeRoute);

export default app;