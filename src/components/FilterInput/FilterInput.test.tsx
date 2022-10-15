import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import FilterInput from '.';
import { cleanup, render } from '../../test/setup/global-setup';

afterEach(cleanup);

const parameters = {
  options: [
    {
      id: '1',
      name: 'hair',
      external_id: 1,
    },
    {
      id: '2',
      name: 'nail',
      external_id: 1,
    },
  ],
  optionLabel: 'name',
  label: 'Teste',
  name: 'teste',
  type: 'text',
  onFilterChanged: jest.fn(),
};

describe('<FilterInput />', () => {
  it('renders without crashing', () => {
    render(<FilterInput {...parameters} />);
  });
  it('calls filter function on selection changed', () => {
    const wrapper = render(<FilterInput {...parameters} />);

    const input = wrapper.getByLabelText(parameters.label, { selector: 'input' });
    userEvent.clear(input);
    userEvent.type(input, 'ha');
    const option = wrapper.getByText('hair', { selector: 'li' });

    expect(input).toBeVisible();
    userEvent.click(option);
    expect(input).toHaveValue('hair');
    expect(parameters.onFilterChanged).toHaveBeenCalled();
  });
  it('calls filter function on date changed', async () => {
    parameters.type = 'date';

    const wrapper = render(
      <MuiPickersUtilsProvider utils={MomentUtils} locale="en" libInstance={moment}>
        <FilterInput {...parameters} />
      </MuiPickersUtilsProvider>,
    );
    const date = wrapper.getByLabelText('date-input', { selector: 'input' });

    userEvent.type(date, '25/11/2021');

    setTimeout(() => {
      expect(date).toHaveValue('25/11/2021');
      expect(parameters.onFilterChanged).toHaveBeenCalled();
    }, 300);
  });
});
