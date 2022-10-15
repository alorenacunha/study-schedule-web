import '@testing-library/jest-dom/extend-expect';
import { t } from 'i18next';
import ProductList from '.';
import { cleanup, render } from '../../../../test/setup/product-setup';

afterEach(cleanup);

const params = {
  handleEditProduct: jest.fn(),
  handleDeleteProduct: jest.fn(),
};

const init = () => {
  const util = render(<ProductList {...params} />);
  return util;
};

describe('<ProductList />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows all columns', () => {
    let util = init();

    const columns = ['name', 'price', 'margin', 'brand', 'category', ''];

    const title = util.getAllByRole('columnheader');

    expect(title.length).toBe(columns.length);

    columns.forEach((col, i) => expect(title[i]).toHaveTextContent(col));
  });
});
