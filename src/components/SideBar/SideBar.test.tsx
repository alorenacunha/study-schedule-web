import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import SideBar from '.';
import { cleanup, render } from '../../test/setup/global-setup';

afterEach(cleanup);

describe('<SideBar />', () => {
  it('renders without crashing', () => {
    render(<SideBar />);
  });

  it('lists items', () => {
    const util = render(<SideBar />);

    const hmText = util.getByLabelText('label-Home');
    const invText = util.getByLabelText('label-Inventory');
    const hmIcon = util.getByLabelText('icon-Home');
    const invIcon = util.getByLabelText('icon-Inventory');
    expect(hmIcon).toBeVisible();
    expect(invIcon).toBeVisible();

    expect(hmText).not.toBeVisible();
    expect(invText).not.toBeVisible();
  });

  it('shows labels on hover', () => {
    const util = render(<SideBar />);

    const hmText = util.getByLabelText('label-Home');
    const invText = util.getByLabelText('label-Inventory');

    const menu = util.getByLabelText('side-bar');

    userEvent.hover(menu);

    //wait for transition
    setTimeout(() => {
      expect(hmText).toBeVisible();
      expect(invText).toBeVisible();
      expect(hmText).toHaveStyle('display: block');
      expect(invText).toHaveStyle('display: block');
    }, 3000);
  });

  it('changes url on click', () => {
    const util = render(<SideBar />);

    const hm = util.getByLabelText('Home');
    const inv = util.getByLabelText('Inventory');
    userEvent.click(hm);
    expect(window.location.pathname).toEqual('/');
    userEvent.click(inv);
    expect(window.location.pathname).toEqual('/inventory');
  });
});
