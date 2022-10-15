import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/category-setup';
import CategoryManagement from '.';

afterEach(cleanup);

describe('<CategoryManagement />', () => {
  it('renders without crashing', () => {
    render(<CategoryManagement />);
  });
});
