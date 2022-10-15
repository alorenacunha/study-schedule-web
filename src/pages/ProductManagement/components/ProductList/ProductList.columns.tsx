import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { t } from 'i18next';
import { formatPercent } from '../../../../utils/utils';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: t('product'),
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'price',
    headerName: t('price'),
    width: 100,
  },
  {
    field: 'margin',
    headerName: t('margin'),
    width: 100,
    valueFormatter: (params) => formatPercent(params.value),
  },
  {
    field: 'brand',
    headerName: t('brand'),
    width: 140,
    renderCell: (params: GridValueGetterParams) => params.row?.brand?.name,
  },
  {
    field: 'category',
    headerName: t('category'),
    width: 140,
    renderCell: (params: GridValueGetterParams) => params.row?.category?.name,
  },
];

export default columns;
