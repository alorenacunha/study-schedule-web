import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import PurchaseOrderForm from '.';
import { PurchaseOrderContext, PurchaseOrderContextData } from '../../../../context/purchaseOrder';
import { PurchaseOrderModel } from '../../../../models/purchaseOrder.interface';
import { purchaseProvidersParameters } from '../../../../test/mock/purchaseOrder.mock';
import { cleanup, render, within } from '../../../../test/setup/purchase-order-setup';

afterEach(cleanup);

const params = {
  handlePurchaseOrderFormClose: jest.fn(),
  handlePurchaseOrderAddProduct: jest.fn(),
  handleDownload: jest.fn(),
};

const init = (providersParameters = purchaseProvidersParameters) => {
  const paramsProvider = {
    ...providersParameters,
    openPurchaseOrderForm: true,
  };

  const util = render(
    <PurchaseOrderContext.Provider
      value={{
        ...(paramsProvider as PurchaseOrderContextData),
      }}
    >
      <PurchaseOrderForm {...params} />
    </PurchaseOrderContext.Provider>,
  );
  return util;
};

describe('<PurchaseOrderForm />', () => {
  it('renders without crashing', () => {
    init();
  });

  it('shows empty form elements when not receive a currentPurchaseOrder', () => {
    const paramsProvider = {
      ...purchaseProvidersParameters,
      currentPurchaseOrder: PurchaseOrderModel(),
    };

    const util = init(paramsProvider);

    const goBack = util.getByLabelText('go-back');
    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const vendorInput = util.getByLabelText('vendor', { selector: 'input' });

    expect(goBack).toBeVisible();

    expect(nameInput).toBeVisible();
    userEvent.type(nameInput, 'name');

    expect(vendorInput).toBeVisible();
    userEvent.type(vendorInput, 'vendor');
  });

  it('shows details elements when receive a currentPurchaseOrder', () => {
    const util = init();

    const goBack = util.getByLabelText('go-back');
    const title = util.getByLabelText('purchase-title');
    const timeline = util.getByLabelText('purchase-timeline');

    expect(goBack).toBeVisible();
    expect(title).toBeVisible();
    expect(timeline).toBeVisible();
  });

  it('shows all columns', () => {
    let util = init();

    const columns = [t('product'), t('price'), t('quantity')];

    const title = util.getAllByRole('columnheader');

    expect(title.length).toBe(columns.length);

    setTimeout(() => {
      columns.forEach((col, i) => expect(title[i]).toHaveTextContent(col));
    }, 300);
  });

  it('shows popup when click on add product button', () => {
    const util = init();

    const addProductButton = util.getByLabelText('add-product', { selector: 'span' });

    userEvent.click(addProductButton);

    setTimeout(() => {
      const addProductPopUp = util.getByLabelText('add-product-modal');
      expect(addProductPopUp).toBeVisible();
    }, 300);
  });

  it('calls handle download when download button is clicked', () => {
    const util = init();

    const downloadButton = util.getByLabelText('download-purchase', { selector: 'span' });

    userEvent.click(downloadButton);

    expect(params.handleDownload).toBeCalledTimes(1);
  });

  it('shows list of products', () => {
    const util = init();

    const table = util.getByLabelText('table-grid');
    const rows = within(table).getAllByRole('row');
    const moisturizer = within(rows[1]).getByText('moisturizer');
    const oil = within(rows[2]).getByText('oil');

    expect(oil).toBeVisible();
    expect(moisturizer).toBeVisible();
  });

  it('changes quantity of a product', () => {
    const util = init();

    const table = util.getByLabelText('table-grid');
    const rows = within(table).getAllByRole('row');
    const cells = within(rows[1]).getAllByRole('cell');
    const quantityCell = cells[cells.length - 1];

    expect(quantityCell).toHaveTextContent('13');
    userEvent.dblClick(quantityCell);

    const quantityInput = within(quantityCell).getByRole('spinbutton');
    expect(quantityInput).toHaveValue(13);

    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, '20');
    expect(quantityInput).toHaveValue(20);
  });

  it('shows checkbox when status equal sent', () => {
    const paramsProvider = {
      ...purchaseProvidersParameters,
      currentPurchaseOrder: { ...purchaseProvidersParameters.currentPurchaseOrder, status: 'sent' },
    };

    const util = init(paramsProvider);

    const table = util.getByLabelText('table-grid');
    const rows = within(table).getAllByRole('row');

    const checkboxCellRow1 = within(rows[1]).getAllByRole('cell')[0];
    const checkboxInputRow1 = within(checkboxCellRow1).getByLabelText('Select Row checkbox');
    expect(checkboxInputRow1).toBeChecked();

    const checkboxCellRow2 = within(rows[2]).getAllByRole('cell')[0];
    const checkboxInputRow2 = within(checkboxCellRow2).getByLabelText('Select Row checkbox');
    expect(checkboxInputRow2).not.toBeChecked();
  });

  it('calls save function when save button is clicked', () => {
    const util = init();

    const saveButton = util.getByLabelText('submit');

    userEvent.click(saveButton);

    expect(params.handlePurchaseOrderFormClose).toBeCalledTimes(1);
  });

  it('closes the page when click on go back button', () => {
    const util = init();

    const goBackButton = util.getByLabelText('go-back');
    const purchaseForm = util.getByLabelText('purchase-form');

    expect(purchaseForm).toBeVisible();

    userEvent.click(goBackButton);

    expect(params.handlePurchaseOrderFormClose).toBeCalledTimes(1);

    setTimeout(() => {
      expect(purchaseForm).not.toBeVisible();
    }, 300);
  });

  it('closes the page when click on cancel button', () => {
    const util = init();

    const cancelButton = util.getByLabelText('submit');
    const purchaseForm = util.getByLabelText('purchase-form');

    expect(purchaseForm).toBeVisible();

    userEvent.click(cancelButton);

    expect(params.handlePurchaseOrderFormClose).toBeCalledTimes(1);

    setTimeout(() => {
      expect(purchaseForm).not.toBeVisible();
    }, 300);
  });
});
