import { Grid, Typography } from '@material-ui/core';
import { GridRowData } from '@mui/x-data-grid';
import { t } from 'i18next';
import Board from '../../components/Board';
import CategoryDeleteDialog from './components/CategoryDeleteDialog';
import CategoryForm from './components/CategoryForm';
import CategoryHeader from './components/CategoryHeader';
import CategoryList from './components/CategoryList';

interface Props {
  handleCreateFormClose: () => void;
  handleDeleteDialogClose: () => void;
  handleNewCategory: () => void;
  handleEditCategory: (row: GridRowData) => void;
  handleDeleteCategory: (row: GridRowData) => void;
}

const CategoryManagementComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    handleCreateFormClose,
    handleDeleteDialogClose,
    handleNewCategory,
    handleEditCategory,
    handleDeleteCategory,
  } = props;

  return (
    <Board>
      <Grid item>
        <Typography variant="h2">{t('category')}</Typography>
      </Grid>
      <Grid item>
        <CategoryHeader {...{ handleNewCategory }} />
      </Grid>
      <Grid item>
        <CategoryList {...{ handleEditCategory, handleDeleteCategory }} />
      </Grid>

      <CategoryForm {...{ handleCreateFormClose }} />
      <CategoryDeleteDialog {...{ handleDeleteDialogClose }} />
    </Board>
  );
};

export default CategoryManagementComponent;
