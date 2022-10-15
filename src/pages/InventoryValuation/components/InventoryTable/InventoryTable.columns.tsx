import { Grid, Typography } from '@material-ui/core';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { formatCurrency, formatPercent } from '../../../../utils/utils';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Product',
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <Grid container direction="column">
          <Typography variant="h6">{params?.getValue(params?.id, 'name')}</Typography>
          <Typography variant="subtitle2">
            {params?.row?.category?.name} - {params?.row?.brand?.name}
          </Typography>
        </Grid>
      );
    },
  },
  {
    field: 'stock',
    headerName: 'Stock',
    width: 100,
  },
  {
    field: 'unit_cost',
    headerName: 'Unit Cost',
    width: 100,
    valueFormatter: (params) => formatCurrency(params.value),
  },
  {
    field: 'wholesale',
    headerName: 'Wholesale',
    width: 100,
    valueFormatter: (params) => formatCurrency(params.value),
  },
  {
    field: 'retail',
    headerName: 'Retail',
    width: 100,
    valueFormatter: (params) => formatCurrency(params.value),
  },
  {
    field: 'profit',
    headerName: 'Profit',
    width: 100,
    valueFormatter: (params) => formatCurrency(params.value),
  },
  {
    field: 'margin',
    headerName: 'Margin',
    width: 100,
    valueFormatter: (params) => formatPercent(params.value),
  },
];

export default columns;
