import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { DefaultTheme, styled, useTheme } from "styled-components";
import { useEffect } from "react";
import { isDarkAtom } from "./atom";
import { useRecoilValue } from "recoil";

const ChartBox = styled.div`
  background-color: ${({ theme }) => theme.subColor};
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export const Chart = () => {
  const { coinId } = useParams();
  const { accentColor } = useTheme();
  const { isLoading, data } = useQuery<ICoinHistory[]>({
    queryKey: ["history", coinId],
    queryFn: () => fetchCoinHistory(coinId ?? ""),
  });

  //Dark Mode value
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <section>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ChartBox>
          <ApexChart
            type="line"
            options={{
              chart: {
                toolbar: { show: false },
                height: 500,
                width: 500,
                background: "transparent",
              },
              theme: { mode: isDark ? "dark" : "light" },
              colors: [accentColor],
              stroke: {
                curve: "smooth",
              },
              xaxis: {
                type: "datetime",
                categories: data!.map((history) => history.time_close * 1000),
              },
              yaxis: {
                opposite: true,
                decimalsInFloat: 0,
              },
            }}
            series={[{ name: "price", data: data!.map((history) => history.close) }]}
          />
        </ChartBox>
      )}
    </section>
  );
};
