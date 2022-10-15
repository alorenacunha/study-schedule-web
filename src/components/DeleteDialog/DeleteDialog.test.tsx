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
  const util = render(<DeleteDialog {...params} />);
  return util;
};

describe('<CategoryDeleteDialog />', () => {
  it('renders without crashing', () => {
    init();
  });

  it('closes the modal when cancel button clicked', () => {
    let util = init();

    const cancelButton = util.getByLabelText('cancel', { selector: 'button' });
    const modal = util.getByLabelText('delete-confirmation-modal', { selector: 'div' });

    userEvent.click(cancelButton);
    setTimeout(() => {
      expect(params.handleDeleteDialogClose).toBeCalledTimes(1);
      expect(modal).not.toBeVisible();
    }, 300);
  });

  it('calls delete function when confirm button clicked', () => {
    let util = init();

    const confirmButton = util.getByLabelText('confirm-delete', { selector: 'button' });

    userEvent.click(confirmButton);
    setTimeout(() => {
      expect(params.handleDelete).toBeCalledTimes(1);
    }, 300);
  });

  it('closes the modal when confirm button clicked', () => {
    let util = init();

    const confirmButton = util.getByLabelText('confirm-delete', { selector: 'button' });
    const modal = util.getByLabelText('delete-confirmation-modal', { selector: 'div' });

    userEvent.click(confirmButton);
    setTimeout(() => {
      expect(modal).not.toBeVisible();
    }, 300);
  });
});
