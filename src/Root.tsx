import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes/theme";

import { Outlet } from "react-router-dom";
import { BaseStyle } from "./components/BaseStyle";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./routes/atom";

export const Root = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const toggleTheme = () => {};
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BaseStyle />
      <Outlet />
    </ThemeProvider>
  );
};
