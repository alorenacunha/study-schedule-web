import '@testing-library/jest-dom/extend-expect';
import ProductManagement from '.';
import { render } from '../../test/setup/product-setup';

describe('<ProductManagement />', () => {
  it('renders without crashing', () => {
    render(<ProductManagement />);
  });
});
