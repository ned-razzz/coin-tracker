import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { isDarkAtom } from "./atom";
import { CoinInfo, CoinPrice } from "./ConType";

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
`;

const Content = styled.div`
  section {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
  font-weight: bold;
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

const InfoBar = styled.ul`
  background-color: ${(props) => props.theme.subColor};
  border-radius: 1.3rem;
  margin-bottom: 0.8rem;

  display: flex;
`;

const InfoCard = styled.li`
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  span:first-child {
    font-size: 0.8rem;
  }
  span:last-child {
    font-size: 1.2rem;
  }
`;

const TabList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tab = styled.li<{ $isActive: boolean }>`
  flex: 1;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.subColor};
  color: ${(props) => (props.$isActive ? props.theme.accentColor : "inherit")};

  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;

  a {
    display: block;
  }
`;

export const Coin = () => {
  //CoinList로부터 코인 정보 state를 받음
  const location = useLocation();
  const state = location.state as { name: string; logo: string };

  //Coin 상세 데이터 fetching
  const { coinId } = useParams<{ coinId: string }>();
  const { isLoading: isLoadingInfo, data: coinInfo } = useQuery<CoinInfo>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId ?? ""),
  });
  const { isLoading: isLoadingTickers, data: coinTickers } = useQuery<CoinPrice>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId ?? ""),
    refetchInterval: 5000,
  });

  //상단 Header 컴포넌트
  //CoinList Page에서 받아온 state 사용. 없으면 fetch한 coinInfo 사용.
  const header = useMemo(() => {
    if (state?.name !== undefined) {
      return (
        <>
          <CoinLogo src={state.logo}></CoinLogo>
          <Title>{state.name}</Title>
        </>
      );
    } else if (coinInfo !== undefined) {
      return (
        <>
          <CoinLogo src={coinInfo.logo}></CoinLogo>
          <Title>{coinInfo.name}</Title>
        </>
      );
    } else {
      return <Title>Loading...</Title>;
    }
  }, [coinInfo]);

  //nested routing ui state
  const isTabPrice = useMatch("coins/:coinId/price");
  const isTabChart = useMatch("coins/:coinId/chart");
  return (
    <Container>
      <Header>{header}</Header>
      <Content>
        <section>
          <InfoBar>
            <InfoCard>
              <span>Rank:</span>
              <span>{coinInfo?.rank ?? "--"}</span>
            </InfoCard>
            <InfoCard>
              <span>Symbol:</span>
              <span>{coinInfo?.symbol ?? "--"}</span>
            </InfoCard>
            <InfoCard>
              <span>Price:</span>
              <span>{coinTickers?.quotes.USD.price.toFixed(2) ?? "--"}</span>
            </InfoCard>
          </InfoBar>
        </section>
        <section>
          <p>
            {coinInfo?.description ??
              "Est et voluptate proident pariatur anim esse mollit commodo magna nostrud eiusmod non mollit nisi. Reprehenderit veniam velit est veniam cupidatat laborum sit. Officia incididunt id dolore nisi exercitation ullamco dolore irure esse ipsum eiusmod veniam proident."}
          </p>
        </section>
        <section>
          <InfoBar>
            <InfoCard>
              <span>total supply:</span>
              <span>{coinTickers?.total_supply ?? "--"}</span>
            </InfoCard>
            <InfoCard>
              <span>total supply:</span>
              <span>{coinTickers?.max_supply ?? "--"}</span>
            </InfoCard>
          </InfoBar>
        </section>
      </Content>
      <TabList>
        <Tab $isActive={isTabChart !== null}>
          <Link to="chart">Chart</Link>
        </Tab>
        <Tab $isActive={isTabPrice !== null}>
          <Link to="price">Price</Link>
        </Tab>
      </TabList>
      <Outlet />
    </Container>
  );
};
