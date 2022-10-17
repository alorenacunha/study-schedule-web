import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/global-setup';
import Create from '.';

afterEach(cleanup);

describe('<Create />', () => {
  it('renders without crashing', () => {
    render(<Create />);
  });
});
