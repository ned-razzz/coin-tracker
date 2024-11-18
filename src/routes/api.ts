const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoinList = async () => {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  return json;
};

export const fetchCoinInfo = async (coinId: string) => {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  const json = await response.json();
  return json;
};

export const fetchCoinTickers = async (coinId: string) => {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  const json = await response.json();
  return json;
};

export const fetchCoinHistory = async (coinId: string) => {
  const response = await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`);
  const json = await response.json();
  return json;
};
