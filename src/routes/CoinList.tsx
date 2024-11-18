import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { fetchCoinList } from "./api";
import { isDarkAtom } from "./atom";

//styled comoponents
const Container = styled.div`
  width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
  font-weight: bold;
`;

const ItemList = styled.ul`
  padding: 0 60px;
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
`;

const CoinItem = styled.li`
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
  font-size: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export const CoinList = () => {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["coinList"],
    queryFn: fetchCoinList,
  });

  //Coin 페이지 라우팅 이벤트 핸들러
  const navigate = useNavigate();
  const routeCoinPage = (coin: ICoin) => () => {
    navigate(`/coins/${coin.id}`, {
      state: { name: coin.name, logo: `https://static.coinpaprika.com/coin/${coin.id}/logo.png` },
    });
  };

  //Dark Mode value
  const setIsDark = useSetRecoilState(isDarkAtom);

  return (
    <Container>
      <Header>
        <Title>Coin List </Title>
        <button onClick={() => setIsDark((current) => !current)}>Toggle Theme</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ItemList>
          {data?.slice(0, 100).map((coin) => (
            <CoinItem key={coin.id} onClick={routeCoinPage(coin)}>
              <CoinLogo src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}></CoinLogo>
              {coin.name} &rarr;
            </CoinItem>
          ))}
        </ItemList>
      )}
    </Container>
  );
};
