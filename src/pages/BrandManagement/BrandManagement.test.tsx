import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/brand-setup';
import BrandManagement from '.';

afterEach(cleanup);

describe('<BrandManagement />', () => {
  it('renders without crashing', () => {
    render(<BrandManagement />);
  });
});
