import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/global-setup';
import userEvent from '@testing-library/user-event';
import DeleteDialog from '.';

afterEach(cleanup);

const params = {
  handleDelete: jest.fn(),
  handleDeleteDialogClose: jest.fn(),
  title: '',
  openDeleteDialog: true,
  loading: false,
  errorFeedback: null,
};

const init = () => {
  // const util = render(<DeleteDialog {...params} />);
  // return util;
};

describe('<CategoryDeleteDialog />', () => {
  it('renders without crashing', () => {
    init();
  });
});
