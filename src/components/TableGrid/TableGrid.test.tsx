import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, within } from '../../test/setup/global-setup';
import userEvent from '@testing-library/user-event';
import TableGrid from '.';

afterEach(cleanup);

const params = {
  rows: [],
  columns: [],
  loading: false,
  pagination: {
    _limit: 10,
    _start: 0,
    pageSize: 5,
    count: 100,
  },
  handleEdit: jest.fn(),
  handleDelete: jest.fn(),
  setPagination: jest.fn(),
};

const init = () => {
  const util = render(<TableGrid {...params} />);
  return util;
};

describe('<TableGrid />', () => {
  it('renders without crashing', () => {});
  it('calls functions when clicked on actions button', () => {
    const util = init();

    setTimeout(() => {
      const row = util.getAllByRole('row')[1];
      const cells = within(row).getAllByRole('cell');
      const editButton = within(cells[cells.length - 1]).getByRole('button', {
        name: 'button-edit',
      });
      const deleteButton = within(cells[cells.length - 1]).getByRole('button', {
        name: 'button-delete',
      });

      userEvent.click(editButton);
      userEvent.click(deleteButton);

      setTimeout(() => {
        expect(params.handleEdit).toHaveBeenCalledTimes(1);
        expect(params.handleDelete).toHaveBeenCalledTimes(1);
      }, 300);
    }, 300);
  });
});
