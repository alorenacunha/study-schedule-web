import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import InventoryValuation from '.';
import { InventoryContext, InventoryContextData } from '../../context/inventory';
import { cleanup, render } from '../../test/setup/inventory-setup';

afterEach(cleanup);

const providersParameters = {
  inventories: [],
  setInventories: jest.fn(),
  resume: {
    date: new Date(),
    margin: 0,
    profit: 0,
    retail: 0,
    wholesale: 0,
  },
  setResume: jest.fn(),
  filter: {},
  setFilter: jest.fn(),
  pagination: {
    _limit: 10,
    _start: 0,
    pageSize: 5,
    count: 100,
  },
  setPagination: jest.fn(),
  loading: true,
  setLoading: jest.fn(),
};

describe('<InventoryValuation />', () => {
  it('renders without crashing', () => {
    render(
      <InventoryContext.Provider value={{ ...(providersParameters as InventoryContextData) }}>
        <InventoryValuation />
      </InventoryContext.Provider>,
    );

    setTimeout(() => {
      expect(providersParameters.setInventories).toHaveBeenCalledTimes(1);
      expect(providersParameters.setResume).toHaveBeenCalledTimes(1);
    }, 300);
  });
  it('requests to reload product and not resume data when search changed', () => {
    const util = render(
      <InventoryContext.Provider value={{ ...(providersParameters as InventoryContextData) }}>
        <InventoryValuation />
      </InventoryContext.Provider>,
    );
    const input = util.getByLabelText(/^search-input$/i, { selector: 'input' });
    userEvent.type(input, 'fa');

    setTimeout(() => {
      expect(providersParameters.setResume).toHaveBeenCalledTimes(1);
      expect(providersParameters.setInventories).toHaveBeenCalledTimes(3);
    }, 300);
  });
  it('requests to reload resume and product when filter changed', () => {
    const util = render(
      <InventoryContext.Provider value={{ ...(providersParameters as InventoryContextData) }}>
        <InventoryValuation />
      </InventoryContext.Provider>,
    );
    const input = util.getByLabelText('date-input', { selector: 'input' });
    userEvent.type(input, '25/11/2021');

    setTimeout(() => {
      expect(input).toHaveValue('25/11/2021');
      expect(providersParameters.setFilter).toHaveBeenCalledTimes(1);
      expect(providersParameters.setInventories).toHaveBeenCalledTimes(1);
      expect(providersParameters.setResume).toHaveBeenCalledTimes(1);
    }, 300);
  });
  it('requests to reload product and not resume when page changed', async () => {
    let util = render(
      <InventoryContext.Provider value={{ ...(providersParameters as InventoryContextData) }}>
        <InventoryValuation />
      </InventoryContext.Provider>,
    );
    const input = await util.getByLabelText('Next page', { selector: 'button' });
    userEvent.click(input);

    setTimeout(() => {
      expect(providersParameters.setPagination).toHaveBeenCalledTimes(2);
      expect(providersParameters.setResume).toHaveBeenCalledTimes(1);
      expect(providersParameters.setInventories).toHaveBeenCalledTimes(1);
    }, 300);
  });
});
