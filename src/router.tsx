import { createBrowserRouter } from "react-router-dom";
import { Root } from "./Root";
import { Chart } from "./routes/Chart";
import { Coin } from "./routes/Coin";
import { CoinList } from "./routes/CoinList";
import { Price } from "./routes/Price";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "coins",
          element: <CoinList />,
        },
        {
          path: "coins/:coinId",
          element: <Coin />,
          children: [
            { path: "price", element: <Price /> },
            { path: "chart", element: <Chart /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
