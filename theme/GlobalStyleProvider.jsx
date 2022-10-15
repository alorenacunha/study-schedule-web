import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-size:  ${({ theme }) => theme.fontSizes[0]};;
    font-family: Noto Sans, Roboto, sans-serif;
    color: ${({ theme }) => theme.color.text};
    margin: unset;
  }

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.gray};
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.color.primary};
  }
`;

export default GlobalStyle;
