import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/category-setup';
import CategoryDeleteDialog from '.';
import { t } from 'i18next';
import { categoryProvidersParameters } from '../../../../test/mock/category.mock';
import { CategoryContext, CategoryContextData } from '../../../../context/category';

afterEach(cleanup);

const init = () => {
  const params = {
    handleDeleteDialogClose: jest.fn(),
  };
  const providersParameters = {
    ...categoryProvidersParameters,
    openDeleteDialog: true,
  };
  const util = render(
    <CategoryContext.Provider value={{ ...(providersParameters as CategoryContextData) }}>
      <CategoryDeleteDialog {...params} />
    </CategoryContext.Provider>,
  );
  return util;
};

describe('<CategoryDeleteDialog />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows category on title', () => {
    let util = init();

    const title = util.getByLabelText('delete-dialog-title', { selector: 'div' });

    expect(title).toHaveTextContent(t('category'));
  });
});
