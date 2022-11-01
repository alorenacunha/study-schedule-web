import MomentUtils from '@date-io/moment';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { I18nextProvider } from 'react-i18next';
import { Outlet } from 'react-router';
import { AuthProvider } from './context/auth';
import i18n from './i18n';
import themeLight from './style/theme-light';

const App: React.FC = (): JSX.Element => {
  return (
    <MuiThemeProvider theme={themeLight}>
      <CssBaseline />

      <I18nextProvider i18n={i18n}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="en" libInstance={moment}>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </I18nextProvider>
    </MuiThemeProvider>
  );
};
export default App;
