import '@testing-library/jest-dom/extend-expect';
import Layout from '.';
import { cleanup, render } from '../../test/setup/global-setup';

afterEach(cleanup);

describe('<Layout />', () => {
  it('renders without crashing', () => {
    render(<Layout />);
  });
});
