import { GridRowData } from '@mui/x-data-grid';
import TableGrid from '../../../../components/TableGrid';
import { useProduct } from '../../../../context/product';
import columns from './ProductList.columns';

export interface Props {
  handleEditProduct: (row: GridRowData) => void;
  handleDeleteProduct: (row: GridRowData) => void;
}

const ProductList: React.FC<Props> = (props): JSX.Element => {
  const { handleEditProduct, handleDeleteProduct } = props;
  const { products, pagination, setPagination, loading } = useProduct();

  return (
    <TableGrid
      rows={products}
      handleEdit={handleEditProduct}
      handleDelete={handleDeleteProduct}
      columns={columns}
      {...{ loading, pagination, setPagination }}
    />
  );
};

export default ProductList;
