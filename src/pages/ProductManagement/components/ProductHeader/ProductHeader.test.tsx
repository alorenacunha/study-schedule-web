import '@testing-library/jest-dom/extend-expect';
import ProductHeader from '.';
import { cleanup, render } from '../../../../test/setup/product-setup';

afterEach(cleanup);

const init = () => {
  const params = {
    handleNewProduct: jest.fn(),
  };
  const util = render(<ProductHeader {...params} />);
  return util;
};

describe('<ProductHeader />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows search component and new button', () => {
    let util = init();

    const search = util.getByLabelText('search-input');
    const newButton = util.getByLabelText('new-button');

    expect(search).toBeVisible();
    expect(newButton).toBeVisible();
  });
});
