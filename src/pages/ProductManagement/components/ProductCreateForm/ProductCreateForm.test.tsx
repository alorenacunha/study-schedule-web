import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ProductCreateForm from '.';
import { ProductContext, ProductContextData } from '../../../../context/product';
import { act, cleanup, render, within } from '../../../../test/setup/product-setup';
import { productProvidersParameters } from '../../../../test/mock/product.mock';

afterEach(cleanup);

const init = (currentProduct = {}) => {
  const params = {
    handleCreateFormClose: jest.fn(),
  };

  const providersParameters = {
    ...productProvidersParameters,
    openCreateForm: true,
    currentProduct,
  };

  const util = render(
    <ProductContext.Provider value={{ ...(providersParameters as ProductContextData) }}>
      <ProductCreateForm {...params} />
    </ProductContext.Provider>,
  );
  return util;
};

describe('<ProductCreateForm />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows all fields empty when dont pass product', () => {
    let util = init();

    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const externalIdInput = util.getByLabelText('external_id', { selector: 'input' });
    const priceInput = util.getByLabelText('price', { selector: 'input' });
    const marginInput = util.getByLabelText('margin', { selector: 'input' });

    expect(nameInput).toHaveValue('');
    expect(externalIdInput).toHaveValue(null);
    expect(priceInput).toHaveValue(null);
    expect(marginInput).toHaveValue(null);
  });
  it('shows all fields with values when pass a product to edit', () => {
    const currentProduct = {
      id: 8,
      name: 'moisturizer',
      external_id: 6345,
      category: {
        id: 2,
        name: 'skin care',
        parent: null,
        external_id: 4321,
        created_at: '2021-12-05T10:56:09.056Z',
        updated_at: '2021-12-05T10:56:09.064Z',
      },
      brand: {
        id: 2,
        name: 'salve',
        external_id: 5432,
        created_at: '2021-12-05T10:56:43.065Z',
        updated_at: '2021-12-05T10:56:43.069Z',
      },
      price: 45,
      margin: 35,
      created_at: '2021-12-14T12:22:37.441Z',
      updated_at: '2021-12-14T12:22:37.458Z',
    };

    let util = init(currentProduct);

    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const externalIdInput = util.getByLabelText('external_id', { selector: 'input' });
    const priceInput = util.getByLabelText('price', { selector: 'input' });
    const marginInput = util.getByLabelText('margin', { selector: 'input' });
    const brandInput = within(util.getByLabelText('brand', { selector: 'div' })).getByLabelText(
      'brand-input',
    );
    const categoryInput = within(
      util.getByLabelText('category', { selector: 'div' }),
    ).getByLabelText('category-input');

    expect(nameInput).toHaveValue(currentProduct.name);
    expect(externalIdInput).toHaveValue(currentProduct.external_id);
    expect(priceInput).toHaveValue(currentProduct.price);
    expect(marginInput).toHaveValue(currentProduct.margin);
    expect(brandInput).toHaveTextContent(currentProduct.brand.name);
    expect(categoryInput).toHaveTextContent(currentProduct.category.name);
  });
  it('closes the modal when cancel button clicked', () => {
    let util = init();

    const cancelButton = util.getByLabelText('cancel', { selector: 'button' });
    const modal = util.getByLabelText('create-form-modal', { selector: 'div' });

    userEvent.click(cancelButton);
    setTimeout(() => {
      expect(modal).not.toBeVisible();
    }, 300);
  });
  it('invalidates form when clicked on save button and the values were invalid', async () => {
    let util = init({});

    const modal = util.getByLabelText('create-form-modal', { selector: 'div' });
    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const externalIdInput = util.getByLabelText('external_id', { selector: 'input' });
    const priceInput = util.getByLabelText('price', { selector: 'input' });
    const marginInput = util.getByLabelText('margin', { selector: 'input' });

    expect(nameInput).toBeInvalid();
    expect(externalIdInput).toBeInvalid();
    expect(priceInput).toBeInvalid();
    expect(marginInput).toBeInvalid();

    const saveButton = util.getByLabelText('submit', { selector: 'button' });
    await act(async () => userEvent.click(saveButton));
    setTimeout(() => {
      expect(modal).not.toBeVisible();
    }, 300);
  });
  it('validate form when clicked on save button and the values were valid', async () => {
    const currentProduct = {
      id: 8,
      name: 'moisturizer',
      external_id: 63457,
      category: {
        id: 2,
        name: 'skin care',
        parent: null,
        external_id: 4321,
        created_at: '2021-12-05T10:56:09.056Z',
        updated_at: '2021-12-05T10:56:09.064Z',
      },
      brand: {
        id: 2,
        name: 'sallve',
        external_id: 5432,
        created_at: '2021-12-05T10:56:43.065Z',
        updated_at: '2021-12-05T10:56:43.069Z',
      },
      price: 45,
      margin: 35,
      created_at: '2021-12-14T12:22:37.441Z',
      updated_at: '2021-12-14T12:22:37.458Z',
    };
    let util = init(currentProduct);

    const modal = util.getByLabelText('create-form-modal', { selector: 'div' });
    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const externalIdInput = util.getByLabelText('external_id', { selector: 'input' });
    const priceInput = util.getByLabelText('price', { selector: 'input' });
    const marginInput = util.getByLabelText('margin', { selector: 'input' });

    expect(nameInput).toBeValid();
    expect(externalIdInput).toBeValid();
    expect(priceInput).toBeValid();
    expect(marginInput).toBeValid();

    const saveButton = util.getByLabelText('submit', { selector: 'button' });
    await act(async () => userEvent.click(saveButton));
    setTimeout(() => {
      expect(modal).not.toBeVisible();
    }, 300);
  });
});
