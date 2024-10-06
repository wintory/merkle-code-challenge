// import { getBinancePrice } from './binanceService'
// import { getCoinbasePrice } from './coinbaseService'

export const getBestExchange = async (btcAmount) => {
  const [binancePrice, coinbasePrice] = await Promise.all([
    // getBinancePrice(),
    // getCoinbasePrice()
  ]);

  const binanceCost = btcAmount * binancePrice;
  const coinbaseCost = btcAmount * coinbasePrice;

  return binanceCost < coinbaseCost
    ? { btcAmount, usdAmount: binanceCost, exchange: 'binance' }
    : { btcAmount, usdAmount: coinbaseCost, exchange: 'coinbase' };
};
