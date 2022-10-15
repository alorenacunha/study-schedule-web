import { Chip, Grid, Typography } from '@material-ui/core';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { t } from 'i18next';
import moment from 'moment';
import ChipStatus from '../../../../components/ChipStatus';
import { PURCHASE_ORDER_STATUS } from '../../../../utils/purchaseStatus';
import { formatCurrency } from '../../../../utils/utils';

const columns: GridColDef[] = [
  {
    field: 'status',
    headerName: t('status'),
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridValueGetterParams) => {
      const status = PURCHASE_ORDER_STATUS.find((item) => item.name == params?.row?.status);
      if (!status) return <Chip label="none" />;
      return <ChipStatus label={status.label} color={status.color} />;
    },
  },
  {
    field: 'name',
    headerName: t('purchase.order'),
    flex: 1,
    minWidth: 160,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <Grid container direction="column">
          <Typography variant="h6">
            #{params?.row?.id} - {params?.row?.name}
          </Typography>
          <Typography variant="subtitle2">
            {params?.row?.created_at
              ? moment(new Date(params?.row?.created_at)).format('MM/DD/yy')
              : ''}{' '}
            - {params?.row?.vendor}
          </Typography>
        </Grid>
      );
    },
  },
  {
    field: 'quantity',
    headerName: t('quantity'),
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'amount',
    headerName: t('amount'),
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => formatCurrency(params.value),
  },
];

export default columns;
