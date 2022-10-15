import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/purchase-order-setup';
import PurchaseOrderHeader from '.';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

const params = {
  handlePurchaseOrderNew: jest.fn(),
};

const init = () => {
  const util = render(<PurchaseOrderHeader {...params} />);
  return util;
};

describe('<PurchaseOrderHeader />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows search input', () => {
    const util = init();

    const input = util.getByLabelText(/^search-input$/i, { selector: 'input' });

    expect(input).toBeVisible();
  });
  it('calls function when click on new button', () => {
    const util = init();

    const newButton = util.getByLabelText('new-button', { selector: 'button' });

    userEvent.click(newButton);
    expect(params.handlePurchaseOrderNew).toBeCalledTimes(1);
  });
});
