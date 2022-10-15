import { Grid } from '@material-ui/core';
import FilterInput from '../../../../components/FilterInput';
import { FilterInputProps } from '../../../../components/FilterInput/FilterInput.container';

interface Props {
  filtersSettings: FilterInputProps[];
  applyFilter: (name: string, value: any) => void;
}

const PurchaseOrderFiltersComponent: React.FC<Props> = (props): JSX.Element => {
  const { filtersSettings, applyFilter } = props;

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      {filtersSettings.map((item, index) => (
        <Grid item key={`item-${index}`}>
          <FilterInput
            key={`item-${index}`}
            aria-label={item.name}
            onFilterChanged={(value) => applyFilter(item.name, value)}
            {...{ ...(item as FilterInputProps) }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PurchaseOrderFiltersComponent;
