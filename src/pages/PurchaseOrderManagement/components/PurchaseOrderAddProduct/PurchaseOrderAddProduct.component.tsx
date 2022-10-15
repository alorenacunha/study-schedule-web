import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { DataGrid, GridCellEditCommitParams } from '@mui/x-data-grid';
import { t } from 'i18next';
import SearchInput from '../../../../components/SearchInput';
import { ISearch } from '../../../../components/SearchInput/SearchInput.container';
import { PurchaseItem } from '../../../../models/purchaseOrder.interface';
import columns from './PurchaseOrderAddProduct.columns';
import styles from './PurchaseOrderAddProduct.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  handleCellEditCommit: (cell: GridCellEditCommitParams) => void;
  openPurchaseOrderAddProduct: boolean;
  handlePurchaseOrderAddProductClose: (boolean) => void;
  handleAddPurchaseProducts: () => void;
  searchInput: ISearch;
  purchaseItemsOptions: PurchaseItem[];
}

const PurchaseOrderAddProductComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    classes,
    handleCellEditCommit,
    openPurchaseOrderAddProduct,
    handlePurchaseOrderAddProductClose,
    handleAddPurchaseProducts,
    searchInput,
    purchaseItemsOptions,
  } = props;

  return (
    <Dialog
      className={classes.root}
      open={openPurchaseOrderAddProduct}
      onClose={() => handlePurchaseOrderAddProductClose(false)}
      aria-label="add-product-modal"
    >
      <DialogTitle aria-label="add-product-title">
        {t('add.what', { what: t('product') })}
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item>
            <SearchInput {...searchInput} />
          </Grid>
          <Grid item className={classes.tableGrid}>
            <DataGrid
              disableColumnFilter
              disableColumnMenu
              disableColumnSelector
              aria-label="add-product-grid"
              disableSelectionOnClick
              rows={purchaseItemsOptions}
              columns={columns}
              columnBuffer={columns.length}
              onCellEditCommit={handleCellEditCommit}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          aria-label="cancel"
          variant="contained"
          onClick={() => handlePurchaseOrderAddProductClose(false)}
        >
          {t('cancel')}
        </Button>

        <Button
          aria-label="add"
          variant="contained"
          color="primary"
          onClick={() => handleAddPurchaseProducts()}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(PurchaseOrderAddProductComponent);
