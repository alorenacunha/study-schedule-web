import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, cleanup } from '../../test/setup/global-setup';
import SearchInput from '.';

afterEach(cleanup);

const parameters = {
  value: 'hair',
  handleSearchChange: jest.fn(),
};

describe('<SearchInput />', () => {
  it('renders without crashing', () => {
    render(<SearchInput {...parameters} />);
  });

  it('shows values', () => {
    const util = render(<SearchInput {...parameters} />);

    const input = util.getByLabelText(/^search-input$/i, { selector: 'input' });

    userEvent.type(input, parameters.value);
    expect(parameters.handleSearchChange).toHaveBeenCalled();
  });
});
