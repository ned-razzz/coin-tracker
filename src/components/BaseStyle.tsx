import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-family: 'Nanum Gothic', sans-serif;
    &::-webkit-scrollbar {
      display: none; /* 스크롤바 숨김 */
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const BaseStyle = () => {
  return (
    <>
      <GlobalStyle />
    </>
  );
};
