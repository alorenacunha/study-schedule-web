import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/purchase-order-setup';
import PurchaseOrderManagement from '.';

afterEach(cleanup);

describe('<PurchaseOrder />', () => {
  it('renders without crashing', () => {
    render(<PurchaseOrderManagement />);
  });
});
