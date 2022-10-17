import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/global-setup';
import Settings from '.';

afterEach(cleanup);

describe('<Settings />', () => {
  it('renders without crashing', () => {
    render(<Settings />);
  });
});
