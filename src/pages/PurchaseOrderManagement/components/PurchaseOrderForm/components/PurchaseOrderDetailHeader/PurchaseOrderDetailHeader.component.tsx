import { Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { PurchaseOrder } from '../../../../../../models/purchaseOrder.interface';
import PurchaseOrderTimeline from '../PurchaseOrderTimeline';

interface Props {
  selectedStatus: string;
  currentPurchaseOrder: PurchaseOrder;
  handleStatusChange: (value: any) => void;
  handlePurchaseOrderFormClose: () => void;
}

const PurchaseOrderDetailHeader: React.FC<Props> = (props): JSX.Element => {
  const { selectedStatus, currentPurchaseOrder, handleStatusChange, handlePurchaseOrderFormClose } =
    props;

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item>
        <Grid container direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
          <Grid item>
            <IconButton
              aria-label={'go-back'}
              component="span"
              onClick={() => handlePurchaseOrderFormClose()}
            >
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography aria-label={'purchase-title'} variant="h4">
              {currentPurchaseOrder?.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <PurchaseOrderTimeline {...{ selectedStatus, currentPurchaseOrder, handleStatusChange }} />
      </Grid>
    </Grid>
  );
};

export default PurchaseOrderDetailHeader;
