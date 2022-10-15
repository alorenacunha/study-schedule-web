import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import Board from '.';

afterEach(cleanup);

describe('<Board />', () => {
  it('renders without crashing', () => {
    render(<Board />);
  });
});
