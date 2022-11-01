import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { cleanup, render, waitFor } from '../../test/setup/global-setup';
import Login from '.';
import { AuthContext, AuthContextData } from '../../context/auth';

afterEach(cleanup);

describe('<Login />', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });
  it('sets invalid credentials to login', async () => {
    const util = render(<Login />);
    const pw = util.getByLabelText(/^password$/i, { selector: 'input' });
    const id = util.getByLabelText(/^identifier$/i, { selector: 'input' });
    const lg = util.getByLabelText(/^submit login button$/i, {
      selector: 'button',
    });

    //waitFor necessary to form validator finish
    await waitFor(() => userEvent.click(lg));

    expect(id).toBeInvalid();
    expect(pw).toBeInvalid();
  });
  it('sets valid credentials to login', async () => {
    const setUserLogged = jest.fn();
    const user = null;
    const jwtStorage = '';
    const userStorage = '';
    const value = { user, jwtStorage, userStorage, setUserLogged } as AuthContextData;
    const util = render(
      <AuthContext.Provider value={{ ...value }}>
        <Login />
      </AuthContext.Provider>,
    );

    const pw = util.getByLabelText(/^password$/i, { selector: 'input' });
    const id = util.getByLabelText(/^identifier$/i, { selector: 'input' });
    const lg = util.getByLabelText(/^submit login button$/i, {
      selector: 'button',
    });

    userEvent.type(id, 'lorena');
    userEvent.type(pw, '123456');

    //waitFor necessary to form validator finish
    await waitFor(() => userEvent.click(lg));

    expect(id).toBeValid();
    expect(pw).toBeValid();
    setTimeout(() => {
      expect(setUserLogged).toHaveBeenCalledTimes(1);
    }, 300);
  });
});
