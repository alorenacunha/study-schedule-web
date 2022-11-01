import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/global-setup';
import Home from '.';

afterEach(cleanup);

describe('<Home />', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });
});
