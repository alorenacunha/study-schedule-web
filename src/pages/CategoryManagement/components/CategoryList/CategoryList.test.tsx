import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/category-setup';
import CategoryList from '.';
import { t } from 'i18next';

afterEach(cleanup);

const init = () => {
  const params = {
    handleEditCategory: jest.fn(),
    handleDeleteCategory: jest.fn(),
  };
  return render(<CategoryList {...params} />);
};

describe('<CategoryList />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows all columns', () => {
    let util = init();

    const columns = [t('category'), t('external.id'), t('parent.category'), ''];

    const title = util.getAllByRole('columnheader');

    expect(title.length).toBe(columns.length);

    columns.forEach((col, i) => expect(title[i]).toHaveTextContent(col));
  });
});
