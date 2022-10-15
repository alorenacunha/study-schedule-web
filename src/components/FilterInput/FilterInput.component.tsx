import { TextField, WithStyles, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { InfoObject } from '../../models/infoObject.interface';
import { FilterInputProps } from './FilterInput.container';
import styles from './FilterInput.styles';

interface Props extends WithStyles<typeof styles>, FilterInputProps {
  selectedValue: InfoObject | null;
  selectedDate: Date | null;
  handleDateChange: (date: any) => void;
  handleSelectChange: (value: InfoObject) => void;
}

const FilterInputComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    classes,
    options,
    optionLabel,
    name,
    label,
    type,
    selectedValue,
    selectedDate,
    handleDateChange,
    handleSelectChange,
  } = props;

  return type === 'date' ? (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      key={name}
      className={classes.filter}
      format="DD/MM/yyyy"
      aria-label={'date-' + name}
      inputVariant="outlined"
      label={label}
      size="small"
      inputProps={{ 'aria-label': 'date-input' }}
      value={selectedDate}
      onChange={handleDateChange}
    />
  ) : (
    <Autocomplete
      id={'select-' + name}
      key={name}
      options={options ? options : []}
      getOptionLabel={optionLabel ? (option) => option[optionLabel] : undefined}
      aria-label={'select-' + name}
      onChange={(event, value) => handleSelectChange(value)}
      renderInput={(params) => (
        <TextField
          value={selectedValue}
          {...params}
          label={label}
          className={classes.filter}
          size="small"
          variant="outlined"
        />
      )}
    />
  );
};

export default withStyles(styles)(FilterInputComponent);
