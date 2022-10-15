import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/global-setup';
import userEvent from '@testing-library/user-event';
import ManagementHeader from '.';

afterEach(cleanup);

const params = {
  handleNewItem: jest.fn(),
  searchInput: {
    value: '',
    handleSearchChange: jest.fn(),
  },
};

const init = () => {
  const util = render(<ManagementHeader {...params} />);
  return util;
};

describe('<ManagementHeader />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('opens create form modal when clicked on new product button', () => {
    const util = init();

    const newButton = util.getByLabelText('new-button', { selector: 'button' });
    userEvent.click(newButton);

    setTimeout(() => {
      const modal = util.getByLabelText('create-product-modal', { selector: 'div' });
      expect(modal).toBeVisible();
    }, 300);
  });
  it('shows search input', () => {
    const util = init();

    const searchInput = util.getByLabelText('search-input', { selector: 'input' });
    expect(searchInput).toBeVisible();
  });
});
