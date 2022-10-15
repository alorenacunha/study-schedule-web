import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import PurchaseOrderList from '.';
import { PurchaseOrderContext, PurchaseOrderContextData } from '../../../../context/purchaseOrder';
import { purchaseProvidersParameters } from '../../../../test/mock/purchaseOrder.mock';
import { cleanup, render, within } from '../../../../test/setup/purchase-order-setup';

afterEach(cleanup);

const params = {
  handleDownload: jest.fn(),
  handlePurchaseOrderAddProduct: jest.fn(),
  handlePurchaseOrderDetails: jest.fn(),
};

const init = () => {
  const util = render(
    <PurchaseOrderContext.Provider
      value={{ ...(purchaseProvidersParameters as PurchaseOrderContextData) }}
    >
      <PurchaseOrderList {...params} />
    </PurchaseOrderContext.Provider>,
  );
  return util;
};

describe('<PurchaseOrderList />', () => {
  it('renders without crashing', () => {
    init();
  });

  it('shows all columns', () => {
    let util = init();

    const columns = [t('status'), t('purchase.order'), t('quantity'), t('amount'), ''];

    const title = util.getAllByRole('columnheader');

    expect(title.length).toBe(columns.length);

    setTimeout(() => {
      columns.forEach((col, i) => expect(title[i]).toHaveTextContent(col));
    }, 300);
  });

  it('shows list of purchase', () => {
    const util = init();

    setTimeout(() => {
      const table = util.getByLabelText('table-grid');
      const rows = within(table).getAllByRole('row');
      console.log(rows.length);
      const purchaseOrder1 = within(rows[1]).getByText('A purchase name');

      expect(purchaseOrder1).toBeVisible();
    }, 300);
  });

  it('calls download function when clicks download button', () => {
    const util = init();

    setTimeout(() => {
      const table = util.getByLabelText('table-grid');
      const rows = within(table).getAllByRole('row');
      const cells = within(rows[1]).getAllByRole('cell');
      const optionsCell = cells[cells.length - 1];

      const downloadButton = within(optionsCell).getByLabelText('button-download');

      userEvent.click(downloadButton);

      expect(params.handleDownload).toBeCalledTimes(1);
    }, 300);
  });

  it('shows popup when clicks add product button', () => {
    const util = init();

    setTimeout(() => {
      const table = util.getByLabelText('table-grid');
      const rows = within(table).getAllByRole('row');
      const cells = within(rows[1]).getAllByRole('cell');
      const optionsCell = cells[cells.length - 1];

      const addProductButton = within(optionsCell).getByLabelText('button-add-product');

      userEvent.click(addProductButton);

      expect(params.handlePurchaseOrderAddProduct).toBeCalledTimes(1);
    }, 300);
  });

  it('show page when clicks detail buttons', () => {
    const util = init();

    setTimeout(() => {
      const table = util.getByLabelText('table-grid');
      const rows = within(table).getAllByRole('row');
      const cells = within(rows[1]).getAllByRole('cell');
      const optionsCell = cells[cells.length - 1];

      const detailButton = within(optionsCell).getByLabelText('button-detail');

      userEvent.click(detailButton);

      expect(params.handlePurchaseOrderDetails).toBeCalledTimes(1);
    }, 300);
  });
});
