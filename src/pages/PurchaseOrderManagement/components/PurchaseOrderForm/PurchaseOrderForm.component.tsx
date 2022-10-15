import { Button, CircularProgress, Grid, IconButton } from '@material-ui/core';
import { GetAppRounded, PlaylistAdd } from '@material-ui/icons';
import { GridCellEditCommitParams, GridRowData } from '@mui/x-data-grid';
import { t } from 'i18next';
import Board from '../../../../components/Board';
import SearchInput from '../../../../components/SearchInput';
import { ISearch } from '../../../../components/SearchInput/SearchInput.container';
import { PurchaseOrder } from '../../../../models/purchaseOrder.interface';
import PurchaseOrderDetailHeaderComponent from './components/PurchaseOrderDetailHeader/PurchaseOrderDetailHeader.component';
import PurchaseOrderFormHeader from './components/PurchaseOrderFormHeader';
import PurchaseOrderFormList from './components/PurchaseOrderFormList';

interface Props {
  errorFeedback: string | null;
  loading: boolean;
  selectedStatus: string;
  searchInput: ISearch;
  newPurchaseOrder;
  setNewPurchaseOrder;
  currentPurchaseOrder: PurchaseOrder;
  handlePurchaseOrderFormSubmit;
  handleCellEditCommit: (cell: GridCellEditCommitParams) => void;
  handleStatusChange: (value: any) => void;
  handleDeliveredSelection: (id: any) => void;
  handlePurchaseOrderFormClose: () => void;
  handlePurchaseOrderAddProduct: (row: GridRowData | null) => void;
  handleDownload: () => void;
}

const PurchaseOrderFormComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    errorFeedback,
    loading,
    selectedStatus,
    searchInput,
    newPurchaseOrder,
    setNewPurchaseOrder,
    currentPurchaseOrder,
    handleCellEditCommit,
    handleStatusChange,
    handleDeliveredSelection,
    handlePurchaseOrderFormSubmit,
    handlePurchaseOrderFormClose,
    handlePurchaseOrderAddProduct,
    handleDownload,
  } = props;

  return (
    <Grid container direction="column" aria-label="purchase-form">
      <Grid item>
        <Board>
          {currentPurchaseOrder && currentPurchaseOrder.id ? (
            <PurchaseOrderDetailHeaderComponent
              {...{
                selectedStatus,
                handleStatusChange,
                currentPurchaseOrder,
                handlePurchaseOrderFormClose,
              }}
            />
          ) : (
            <PurchaseOrderFormHeader
              {...{
                newPurchaseOrder,
                setNewPurchaseOrder,
                errorFeedback,
                handlePurchaseOrderFormClose,
              }}
            />
          )}
        </Board>
      </Grid>
      <Grid item>
        <Board>
          <Grid item>
            <Grid container direction="row" justifyContent="center" spacing={2}>
              <Grid item>
                <SearchInput {...searchInput} />
              </Grid>
              <Grid item>
                <IconButton
                  aria-label={'add-product'}
                  component="span"
                  onClick={() => handlePurchaseOrderAddProduct(currentPurchaseOrder)}
                >
                  <PlaylistAdd />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label={'download-purchase'}
                  component="span"
                  onClick={() => handleDownload()}
                >
                  <GetAppRounded />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <PurchaseOrderFormList {...{ handleCellEditCommit, handleDeliveredSelection }} />
          </Grid>
          <Grid item>
            <Grid container direction="row" justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button
                  aria-label="cancel"
                  variant="contained"
                  onClick={() => handlePurchaseOrderFormClose()}
                >
                  {t('cancel')}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  aria-label="submit"
                  variant="contained"
                  color="primary"
                  onClick={handlePurchaseOrderFormSubmit}
                >
                  {!loading ? (
                    t('save')
                  ) : (
                    <CircularProgress color="secondary" aria-label="loading" />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Board>
      </Grid>
    </Grid>
  );
};

export default PurchaseOrderFormComponent;
