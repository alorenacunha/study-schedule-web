import { Grid, Typography } from '@material-ui/core';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { t } from 'i18next';
import { formatCurrency } from '../../../../utils/utils';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Product',
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <Grid container direction="column">
          <Typography variant="h6"> {params?.row?.product?.name}</Typography>
          <Typography variant="subtitle2">
            {params?.row?.product?.category?.name} - {params?.row?.product?.brand?.name}
          </Typography>
        </Grid>
      );
    },
  },
  {
    field: 'quantity',
    headerName: t('quantity'),
    editable: true,
    type: 'number',
    width: 100,
    valueFormatter: (params) => formatCurrency(params.value),
  },
];

export default columns;
