import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/brand-setup';
import BrandHeader from '.';

afterEach(cleanup);

const init = () => {
  const params = {
    handleNewBrand: jest.fn(),
  };

  return render(<BrandHeader {...params} />);
};

describe('<BrandHeader />', () => {
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
