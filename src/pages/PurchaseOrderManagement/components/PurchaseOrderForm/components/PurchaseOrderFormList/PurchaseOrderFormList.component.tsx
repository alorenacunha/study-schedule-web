import { Grid, WithStyles, withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { DataGrid, GridCellEditCommitParams } from '@mui/x-data-grid';
import { PurchaseItem } from '../../../../../../models/purchaseOrder.interface';
import columnsFormList from './PurchaseOrderFormList.columns';
import styles from './PurchaseOrderFormList.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  handleCellEditCommit: (cell: GridCellEditCommitParams) => void;
  handleSelection: (ids: any) => void;
  purchaseItemsOptions: PurchaseItem[];
  checkboxSelection: boolean;
  selectionModel: number[];
}

const PurchaseOrderFormListComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    classes,
    handleCellEditCommit,
    handleSelection,
    purchaseItemsOptions,
    checkboxSelection,
    selectionModel,
  } = props;

  return (
    <Grid item className={classes.tableGrid}>
      <DataGrid
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        checkboxSelection={checkboxSelection}
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelection}
        aria-label="table-grid"
        disableSelectionOnClick
        rows={purchaseItemsOptions}
        columns={columnsFormList}
        columnBuffer={columnsFormList.length}
        onCellEditCommit={handleCellEditCommit}
      />
    </Grid>
  );
};

export default withStyles(styles)(PurchaseOrderFormListComponent);
