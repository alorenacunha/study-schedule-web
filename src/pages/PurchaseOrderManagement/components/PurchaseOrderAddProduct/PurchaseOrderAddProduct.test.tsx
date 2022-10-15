import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, within } from '../../../../test/setup/purchase-order-setup';
import PurchaseOrderAddProduct from '.';
import { PurchaseOrderContext, PurchaseOrderContextData } from '../../../../context/purchaseOrder';
import { purchaseProvidersParameters } from '../../../../test/mock/purchaseOrder.mock';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

const params = {
  handlePurchaseOrderAddProductClose: jest.fn(),
};

const providersParameters = {
  ...purchaseProvidersParameters,
  openPurchaseOrderAddProduct: true,
};

const init = () => {
  const util = render(
    <PurchaseOrderContext.Provider value={{ ...(providersParameters as PurchaseOrderContextData) }}>
      <PurchaseOrderAddProduct {...params} />
    </PurchaseOrderContext.Provider>,
  );
  return util;
};

describe('<PurchaseOrderAddProduct />', () => {
  it('renders without crashing', () => {
    init();
  });

  it('shows title, search and products list', async () => {
    const util = init();

    const title = util.getByLabelText('add-product-title');
    expect(title).toBeVisible();

    const search = util.getByLabelText('search');
    expect(search).toBeVisible();

    const productList = util.getByLabelText('add-product-grid');
    expect(productList).toBeVisible();
  });

  it('changes products list when search', async () => {
    const util = init();

    const productList = util.getByLabelText('add-product-grid');
    expect(productList).toBeVisible();

    const productItem = within(productList).getByText('moisturizer');
    expect(productItem).toBeVisible();

    const searchInput = util.getByLabelText('search-input');
    expect(searchInput).toBeVisible();

    userEvent.type(searchInput, 'ha');

    expect(productItem).not.toBeVisible();
  });

  it('changes products quantity and save', async () => {
    const util = init();

    const productList = util.getByLabelText('add-product-grid');
    expect(productList).toBeVisible();

    const row = util.getAllByRole('row')[1];
    const cells = within(row).getAllByRole('cell');
    const quantityInput = cells[cells.length - 1];
    const modal = util.getByLabelText('add-product-modal', { selector: 'div' });

    userEvent.type(quantityInput, '2');

    const saveButton = util.getByLabelText('add', { selector: 'button' });

    userEvent.click(saveButton);

    setTimeout(() => {
      expect(params.handlePurchaseOrderAddProductClose).toHaveBeenCalledTimes(1);
      expect(modal).not.toBeVisible();
    }, 300);
  });

  it('closes the modal when cancel button clicked', () => {
    let util = init();

    const cancelButton = util.getByLabelText('cancel', { selector: 'button' });
    const modal = util.getByLabelText('add-product-modal', { selector: 'div' });

    userEvent.click(cancelButton);
    setTimeout(() => {
      expect(params.handlePurchaseOrderAddProductClose).toHaveBeenCalledTimes(1);
      expect(modal).not.toBeVisible();
    }, 300);
  });
});
