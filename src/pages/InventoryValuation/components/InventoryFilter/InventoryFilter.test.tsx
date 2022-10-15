import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/inventory-setup';
import InventoryFilter from '.';

afterEach(cleanup);

describe('<InventoryFilter />', () => {
  it('renders without crashing', () => {
    render(<InventoryFilter />);
  });
});
