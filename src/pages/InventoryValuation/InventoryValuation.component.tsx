import { Grid, Paper, WithStyles } from '@material-ui/core';
import { ClassNameMap, withStyles } from '@material-ui/styles';
import { Inventory } from '../../models/inventory.interface';
import SearchInput from '../../components/SearchInput';
import { ISearch } from '../../components/SearchInput/SearchInput.container';
import InventoryFilter from './components/InventoryFilter';
import InventoryResume from './components/InventoryResume';
import { InventoryResumeType } from './components/InventoryResume/InventoryResume.component';
import InventoryTable from './components/InventoryTable';
import styles from './InventoryValuation.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  resumesSettings: InventoryResumeType[];
  searchInput: ISearch;
  inventories: Inventory[];
}

const InventoryValuationComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, resumesSettings, searchInput, inventories } = props;

  return (
    <Grid container className={classes.root} direction="column" spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Grid container direction="row" spacing={3} justifyContent="center">
          {resumesSettings.map((resume, index) => (
            <InventoryResume key={`resume-${index}`} {...resume} />
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Paper className={classes.content}>
          <Grid container direction="column" justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <InventoryFilter />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" justifyContent="center">
                <SearchInput {...searchInput} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <InventoryTable rows={inventories}></InventoryTable>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(InventoryValuationComponent);
