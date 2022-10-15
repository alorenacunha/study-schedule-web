import MomentUtils from '@date-io/moment';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { render, RenderOptions } from '@testing-library/react';
import moment from 'moment';
import { FC, ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../../i18n';
import themeLight from '../../style/theme-light';

const GlobalProviders: FC = ({ children }) => {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={themeLight}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils} locale="en" libInstance={moment}>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: GlobalProviders, ...options });

export * from '@testing-library/react';
export { GlobalProviders };
export { customRender as render };
