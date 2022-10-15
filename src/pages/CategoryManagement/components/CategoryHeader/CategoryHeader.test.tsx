import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/category-setup';
import CategoryHeader from '.';

afterEach(cleanup);
const init = () => {
  const params = {
    handleNewCategory: jest.fn(),
  };

  return render(<CategoryHeader {...params} />);
};

describe('<CategoryHeader />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows search component and new button', () => {
    let util = init();

    const search = util.getByLabelText('search-input');
    const newButton = util.getByLabelText('new-button');

    expect(search).toBeVisible();
    expect(newButton).toBeVisible();
  });
});
