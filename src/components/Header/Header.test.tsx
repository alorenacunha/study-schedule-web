import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Header from '.';
import { AuthContext, AuthContextData } from '../../context/auth';
import { act, cleanup, render } from '../../test/setup/global-setup';

afterEach(cleanup);

describe('<Header />', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });
  it('clicks on avatar, shows popup and logout', async () => {
    const setUserLogged = jest.fn();
    const user = null;
    const jwtStorage = '';
    const userStorage = '';
    const value = { user, jwtStorage, userStorage, setUserLogged } as AuthContextData;

    const util = render(
      <AuthContext.Provider value={{ ...value }}>
        <Header />
      </AuthContext.Provider>,
    );
    const av = util.getByLabelText(/^avatar$/i, { selector: 'button' });
    const lg = util.getByLabelText(/^logout$/i, { selector: 'li' });

    userEvent.click(av);
    expect(lg).toBeEnabled();

    await act(async () => userEvent.click(lg));
    expect(window.location.pathname).toEqual('/login');
  });
  it('clicks on avatar, shows popup and closes', () => {
    const util = render(<Header />);
    const av = util.getByLabelText(/^avatar$/i, { selector: 'button' });
    const lg = util.getByLabelText(/^logout$/i, { selector: 'li' });
    const username = util.getByLabelText(/^username$/i, { selector: 'li' });

    userEvent.click(av);
    expect(lg).toBeEnabled();
    expect(username).toBeEnabled();

    userEvent.click(username);
    expect(lg).not.toBeVisible();
    expect(username).not.toBeVisible();
  });
});
