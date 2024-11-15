import { ThemeProvider } from "styled-components";
import { appTheme } from "./themes/theme";

import { Outlet } from "react-router-dom";
import { BaseStyle } from "./components/BaseStyle";

export const Root = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <BaseStyle />
      <Outlet />
      </ThemeProvider>
  );
};
