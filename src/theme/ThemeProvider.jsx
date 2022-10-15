import React from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

const ThemeProvider = ({ children, theme }) => {
  return <StyledProvider theme={theme}>{children}</StyledProvider>;
};

export default ThemeProvider;
