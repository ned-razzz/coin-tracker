import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { RecoilRoot } from "recoil";

import "./index.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
