import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/brand-setup';
import BrandList from '.';
import { t } from 'i18next';

afterEach(cleanup);

const init = () => {
  const params = {
    handleEditBrand: jest.fn(),
    handleDeleteBrand: jest.fn(),
  };
  return render(<BrandList {...params} />);
};

describe('<BrandList />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows all columns', () => {
    let util = init();

    const columns = [t('brand'), t('external.id'), ''];

    const title = util.getAllByRole('columnheader');

    expect(title.length).toBe(columns.length);

    columns.forEach((col, i) => expect(title[i]).toHaveTextContent(col));
  });
});
