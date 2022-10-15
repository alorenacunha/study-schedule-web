import { Grid, withStyles } from '@material-ui/core';
import FilterInput from '../../../../components/FilterInput';
import { FilterInputProps } from '../../../../components/FilterInput/FilterInput.container';
import styles from './InventoryFilter.styles';

interface Props {
  filtersSettings: FilterInputProps[];
  applyFilter: (name: string, value: any) => void;
}

const InventoryFilterComponent: React.FC<Props> = (props): JSX.Element => {
  const { filtersSettings, applyFilter } = props;

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      {filtersSettings.map((item, index) => (
        <Grid item key={`item-${index}`}>
          <FilterInput
            key={`item-${index}`}
            onFilterChanged={(value) => applyFilter(item.name, value)}
            {...{ ...(item as FilterInputProps) }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(InventoryFilterComponent);
