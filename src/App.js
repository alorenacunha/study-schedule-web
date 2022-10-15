import React from "react";
import Home from "./pages/home";
import GlobalStyle from "./theme/GlobalStyleProvider";
import { theme } from "./theme/theme";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle theme={theme} />
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
