import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 0 10vw;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 30px;
  font-weight: bold;
`;

const ItemList = styled.ul``;

const CoinItem = styled.li`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.subColor};
  font-size: 1.2rem;
  cursor: pointer;

  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }

  display: flex;
  align-items: center;
`;

const CoinLogo = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

const Loader = styled.h2`
  font-size: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export const CoinList = () => {
  const [coinList, setCoinList] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoinList(json.slice(0, 100));
      setIsLoading(false);
    })();
  }, []);

  const navigate = useNavigate();
  const routeCoinPage = (coinId: string) => () => {
    navigate(`/coins/${coinId}`);
  };

  return (
    <Container>
      <Header>
        <Title>Coin Chart</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ItemList>
          {coinList.map((coin) => (
            <CoinItem key={coin.id} onClick={routeCoinPage(coin.name)}>
              <CoinLogo src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}></CoinLogo>
              {coin.name} &rarr;
            </CoinItem>
          ))}
        </ItemList>
      )}
    </Container>
  );
};
