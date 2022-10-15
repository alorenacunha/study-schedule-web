import { Grid } from '@material-ui/core';
import { GridRowData } from '@mui/x-data-grid';
import Board from '../../components/Board';
import PurchaseOrderAddProduct from './components/PurchaseOrderAddProduct';
import PurchaseOrderFilters from './components/PurchaseOrderFilters';
import PurchaseOrderForm from './components/PurchaseOrderForm';
import PurchaseOrderHeader from './components/PurchaseOrderHeader';
import PurchaseOrderList from './components/PurchaseOrderList';

interface Props {
  openPurchaseOrderForm: boolean;
  handleDownload: () => void;
  handlePurchaseOrderNew: () => void;
  handlePurchaseOrderDetails: (row: GridRowData) => void;
  handlePurchaseOrderFormClose: () => void;
  handlePurchaseOrderAddProduct: (row: GridRowData | null) => void;
  handlePurchaseOrderAddProductClose: (boolean) => void;
}

const PurchaseOrderManagementComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    openPurchaseOrderForm,
    handleDownload,
    handlePurchaseOrderNew,
    handlePurchaseOrderDetails,
    handlePurchaseOrderFormClose,
    handlePurchaseOrderAddProduct,
    handlePurchaseOrderAddProductClose,
  } = props;
  return (
    <Grid container direction="column">
      {openPurchaseOrderForm ? (
        <PurchaseOrderForm
          {...{ handlePurchaseOrderFormClose, handlePurchaseOrderAddProduct, handleDownload }}
        />
      ) : (
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Board>
              <PurchaseOrderFilters />
            </Board>
          </Grid>

          <Grid item>
            <Board>
              <Grid item>
                <PurchaseOrderHeader {...{ handlePurchaseOrderNew }} />
              </Grid>

              <Grid item>
                <PurchaseOrderList
                  {...{ handleDownload, handlePurchaseOrderAddProduct, handlePurchaseOrderDetails }}
                />
              </Grid>
            </Board>
          </Grid>
        </Grid>
      )}
      <PurchaseOrderAddProduct {...{ handlePurchaseOrderAddProductClose }} />
    </Grid>
  );
};

export default PurchaseOrderManagementComponent;
