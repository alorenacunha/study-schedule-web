import { Grid, Typography } from '@material-ui/core';
import { GridRowData } from '@mui/x-data-grid';
import { t } from 'i18next';
import Board from '../../components/Board';
import ProductCreateForm from './components/ProductCreateForm';
import ProductDeleteDialog from './components/ProductDeleteDialog';
import ProductHeader from './components/ProductHeader';
import ProductList from './components/ProductList';

interface Props {
  handleNewProduct: () => void;
  handleCreateFormClose: () => void;
  handleDeleteDialogClose: () => void;
  handleEditProduct: (row: GridRowData) => void;
  handleDeleteProduct: (row: GridRowData) => void;
}

const ProductManagementComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    handleCreateFormClose,
    handleDeleteDialogClose,
    handleNewProduct,
    handleEditProduct,
    handleDeleteProduct,
  } = props;

  return (
    <Board>
      <Grid item>
        <Typography variant="h2">{t('product')}</Typography>
      </Grid>
      <Grid item>
        <ProductHeader {...{ handleNewProduct }} />
      </Grid>
      <Grid item>
        <ProductList {...{ handleEditProduct, handleDeleteProduct }} />
      </Grid>

      <ProductCreateForm {...{ handleCreateFormClose }} />
      <ProductDeleteDialog {...{ handleDeleteDialogClose }} />
    </Board>
  );
};

export default ProductManagementComponent;
