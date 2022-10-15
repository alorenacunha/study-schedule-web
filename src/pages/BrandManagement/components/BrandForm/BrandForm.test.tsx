import '@testing-library/jest-dom/extend-expect';
import { act, cleanup, render, within } from '../../../../test/setup/brand-setup';
import userEvent from '@testing-library/user-event';
import BrandForm from '.';
import { BrandContext, BrandContextData } from '../../../../context/brand';
import { brandProvidersParameters } from '../../../../test/mock/brand.mock';

afterEach(cleanup);

const init = (currentBrand) => {
  const params = {
    handleCreateFormClose: jest.fn(),
  };

  const providersParameters = {
    ...brandProvidersParameters,
    openCreateForm: true,
    currentBrand,
  };

  const util = render(
    <BrandContext.Provider value={{ ...(providersParameters as BrandContextData) }}>
      <BrandForm {...params} />
    </BrandContext.Provider>,
  );
  return util;
};

describe('<BrandForm />', () => {
  it('renders without crashing', () => {
    render(<BrandForm handleCreateFormClose={jest.fn()} />);
  });

  it('shows all fields empty when dont pass product', () => {
    let util = init(null);

    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const externalIdInput = util.getByLabelText('external_id', { selector: 'input' });

    expect(nameInput).toHaveValue('');
    expect(externalIdInput).toHaveValue(null);
  });

  it('shows all fields with values when pass a product to edit', () => {
    const currentBrand = {
      id: 2,
      name: 'skin care',
      external_id: 4321,
      created_at: '2021-12-05T10:56:09.056Z',
      updated_at: '2021-12-05T10:56:09.064Z',
    };
    let util = init(currentBrand);

    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const externalIdInput = util.getByLabelText('external_id', { selector: 'input' });

    expect(nameInput).toHaveValue(currentBrand.name);
    expect(externalIdInput).toHaveValue(currentBrand.external_id);
  });

  it('closes the modal when cancel button clicked', () => {
    let util = init(null);

    const cancelButton = util.getByLabelText('cancel', { selector: 'button' });
    const modal = util.getByLabelText('create-form-modal', { selector: 'div' });

    userEvent.click(cancelButton);
    setTimeout(() => {
      expect(modal).not.toBeVisible();
    }, 300);
  });

  it('invalidates form when clicked on save button and the values are invalid', async () => {
    let util = init(null);

    const modal = util.getByLabelText('create-form-modal', { selector: 'div' });
    const nameInput = util.getByLabelText('name', { selector: 'input' });

    expect(nameInput).toBeInvalid();

    const saveButton = util.getByLabelText('submit', { selector: 'button' });
    await act(async () => userEvent.click(saveButton));
    setTimeout(() => {
      expect(modal).not.toBeVisible();
    }, 300);
  });

  it('validate form when clicked on save button and the values are valid', async () => {
    const currentBrand = {
      id: 2,
      name: 'skin care',
      external_id: 4321,
      created_at: '2021-12-05T10:56:09.056Z',
      updated_at: '2021-12-05T10:56:09.064Z',
    };
    let util = init(currentBrand);

    const modal = util.getByLabelText('create-form-modal', { selector: 'div' });
    const nameInput = util.getByLabelText('name', { selector: 'input' });

    expect(nameInput).toBeValid();

    const saveButton = util.getByLabelText('submit', { selector: 'button' });
    await act(async () => userEvent.click(saveButton));
    setTimeout(() => {
      expect(modal).not.toBeVisible();
    }, 300);
  });
});
