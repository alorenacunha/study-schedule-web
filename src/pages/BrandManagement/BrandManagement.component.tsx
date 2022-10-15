import { Grid, Typography } from '@material-ui/core';
import { GridRowData } from '@mui/x-data-grid';
import { t } from 'i18next';
import Board from '../../components/Board';
import BrandDeleteDialog from './components/BrandDeleteDialog';
import BrandForm from './components/BrandForm';
import BrandHeader from './components/BrandHeader';
import BrandList from './components/BrandList';

interface Props {
  handleCreateFormClose: () => void;
  handleDeleteDialogClose: () => void;
  handleNewBrand: () => void;
  handleEditBrand: (row: GridRowData) => void;
  handleDeleteBrand: (row: GridRowData) => void;
}

const BrandManagementComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    handleCreateFormClose,
    handleDeleteDialogClose,
    handleNewBrand,
    handleEditBrand,
    handleDeleteBrand,
  } = props;

  return (
    <Board>
      <Grid item>
        <Typography variant="h2">{t('brand')}</Typography>
      </Grid>
      <Grid item>
        <BrandHeader {...{ handleNewBrand }} />
      </Grid>
      <Grid item>
        <BrandList {...{ handleEditBrand, handleDeleteBrand }} />
      </Grid>

      <BrandForm {...{ handleCreateFormClose }} />
      <BrandDeleteDialog {...{ handleDeleteDialogClose }} />
    </Board>
  );
};

export default BrandManagementComponent;
