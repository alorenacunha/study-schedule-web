import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { t } from 'i18next';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: t('category'),
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'external_id',
    headerName: t('external.id'),
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'parent',
    headerName: t('parent.category'),
    width: 140,
    renderCell: (params: GridValueGetterParams) => params.row.parent?.name,
  },
];

export default columns;
