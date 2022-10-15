import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/global-setup';
import InventoryResume from '../InventoryResume';

afterEach(cleanup);

const parameters = {
  value: 12500,
  description: 'Wholesale value',
  name: 'wholesale',
};

describe('<InventoryResume />', () => {
  it('renders without crashing', () => {
    render(<InventoryResume {...parameters} />);
  });
  it('shows values', () => {
    const util = render(<InventoryResume {...parameters} />);

    const av = util.getByLabelText(`value-${parameters.value}`);
    const lg = util.getByLabelText(`description-${parameters.description}`);

    expect(av.textContent).toEqual(String(parameters.value));
    expect(lg.textContent).toEqual(parameters.description);
  });
});
