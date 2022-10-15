import { Grid, WithStyles, withStyles } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowData } from '@mui/x-data-grid';
import { Pagination } from '../../models/pagination.interface';
import styles from './TableGrid.styles';

export interface Props extends WithStyles<typeof styles> {
  rows: GridRowData[];
  columns: GridColDef[];
  loading: boolean;
  setPage: (number) => void;
  pagination: Pagination;
}

const TableGridComponent: React.FC<Props> = (props): JSX.Element => {
  const { rows, columns, loading, setPage, pagination, classes } = props;

  return (
    <Grid className={classes.root}>
      <DataGrid
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        aria-label="table-grid"
        disableSelectionOnClick
        pagination
        pageSize={pagination.pageSize}
        rowsPerPageOptions={[pagination.pageSize]}
        rowCount={pagination.count}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        columnBuffer={columns.length}
        {...{ rows, columns, loading }}
      />
    </Grid>
  );
};

export default withStyles(styles)(TableGridComponent);
