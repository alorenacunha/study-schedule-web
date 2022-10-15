import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/inventory-setup';
import InventoryTable from '.';

afterEach(cleanup);

const params = {
  rows: [],
};

describe('<InventoryTable />', () => {
  it('renders without crashing', () => {
    render(<InventoryTable {...params} />);
  });
});
