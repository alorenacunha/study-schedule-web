import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../test/setup/global-setup';
import Plans from '.';

afterEach(cleanup);

describe('<Plans />', () => {
  it('renders without crashing', () => {
    render(<Plans />);
  });
});
