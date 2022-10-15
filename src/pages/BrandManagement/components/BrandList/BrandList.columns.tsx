import { GridColDef } from '@mui/x-data-grid';
import { t } from 'i18next';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: t('brand'),
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'external_id',
    headerName: t('external.id'),
    flex: 1,
    minWidth: 150,
  },
];

export default columns;
