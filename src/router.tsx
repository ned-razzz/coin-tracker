import { createBrowserRouter } from "react-router-dom";
import { Root } from "./Root";
import { Coin } from "./routes/Coin";
import { CoinList } from "./routes/CoinList";

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
