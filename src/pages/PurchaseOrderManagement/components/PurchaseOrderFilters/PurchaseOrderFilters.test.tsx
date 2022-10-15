import '@testing-library/jest-dom/extend-expect';
import PurchaseOrderFilters from '.';
import { cleanup, render } from '../../../../test/setup/purchase-order-setup';
import filterSettings from './PurchaseOrderFilter.settings';

afterEach(cleanup);

const init = () => {
  const util = render(<PurchaseOrderFilters />);
  return util;
};

describe('<PurchaseOrderFilters />', () => {
  it('renders without crashing', () => {
    init();
  });

  it('shows the filters', () => {
    const util = init();
    filterSettings.forEach((filter) => {
      const filterDiv = util.getByLabelText(
        `${filter.type ? filter.type : 'select'}-${filter.name}`,
      );

      expect(filterDiv).toBeVisible();
    });
  });
});
