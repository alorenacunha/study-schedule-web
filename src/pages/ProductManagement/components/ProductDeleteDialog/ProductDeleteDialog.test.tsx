import '@testing-library/jest-dom/extend-expect';
import { t } from 'i18next';
import ProductDeleteDialog from '.';
import { ProductContext, ProductContextData } from '../../../../context/product';
import { productProvidersParameters } from '../../../../test/mock/product.mock';
import { cleanup, render } from '../../../../test/setup/product-setup';

afterEach(cleanup);

const init = () => {
  const params = {
    handleDeleteDialogClose: jest.fn(),
  };
  const providersParameters = {
    ...productProvidersParameters,
    openDeleteDialog: true,
  };
  const util = render(
    <ProductContext.Provider value={{ ...(providersParameters as ProductContextData) }}>
      <ProductDeleteDialog {...params} />
    </ProductContext.Provider>,
  );
  return util;
};

describe('<ProductDeleteDialog />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows category on title', () => {
    let util = init();

    const title = util.getByLabelText('delete-dialog-title', { selector: 'div' });

    expect(title).toHaveTextContent(t('product'));
  });
});
