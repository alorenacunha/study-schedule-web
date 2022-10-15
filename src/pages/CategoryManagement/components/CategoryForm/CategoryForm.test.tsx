import '@testing-library/jest-dom/extend-expect';
import { act, cleanup, render, within } from '../../../../test/setup/category-setup';
import userEvent from '@testing-library/user-event';
import CategoryForm from '.';
import { CategoryContext, CategoryContextData } from '../../../../context/category';
import { categoryProvidersParameters } from '../../../../test/mock/category.mock';

afterEach(cleanup);

const init = (currentCategory) => {
  const params = {
    handleCreateFormClose: jest.fn(),
  };

  const providersParameters = {
    ...categoryProvidersParameters,
    openCreateForm: true,
    currentCategory,
  };

  const util = render(
    <CategoryContext.Provider value={{ ...(providersParameters as CategoryContextData) }}>
      <CategoryForm {...params} />
    </CategoryContext.Provider>,
  );
  return util;
};

describe('<CategoryForm />', () => {
  it('renders without crashing', () => {
    render(<CategoryForm handleCreateFormClose={jest.fn()} />);
  });
  it('shows all fields empty when dont pass product', () => {
    let util = init(null);

    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const externalIdInput = util.getByLabelText('external_id', { selector: 'input' });

    expect(nameInput).toHaveValue('');
    expect(externalIdInput).toHaveValue(null);
  });
  it('shows all fields with values when pass a product to edit', () => {
    const currentCategory = {
      id: 2,
      name: 'skin care',
      parent: {
        id: 2,
        name: 'skin care',
        parent: null,
      },
      external_id: 4321,
      created_at: '2021-12-05T10:56:09.056Z',
      updated_at: '2021-12-05T10:56:09.064Z',
    };
    let util = init(currentCategory);

    const nameInput = util.getByLabelText('name', { selector: 'input' });
    const externalIdInput = util.getByLabelText('external_id', { selector: 'input' });
    const categoryInput = within(util.getByLabelText('parent', { selector: 'div' })).getByLabelText(
      'parent-input',
    );

    expect(nameInput).toHaveValue(currentCategory.name);
    expect(externalIdInput).toHaveValue(currentCategory.external_id);
    expect(categoryInput).toHaveTextContent(currentCategory.parent.name);
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
    const currentCategory = {
      id: 2,
      name: 'skin care',
      external_id: 4321,
      created_at: '2021-12-05T10:56:09.056Z',
      updated_at: '2021-12-05T10:56:09.064Z',
    };
    let util = init(currentCategory);

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
