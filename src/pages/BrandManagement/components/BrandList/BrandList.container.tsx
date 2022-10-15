import { GridRowData } from '@mui/x-data-grid';
import TableGrid from '../../../../components/TableGrid';
import { useBrand } from '../../../../context/brand';
import Columns from './BrandList.columns';

export interface Props {
  handleEditBrand: (row: GridRowData) => void;
  handleDeleteBrand: (row: GridRowData) => void;
}

const BrandList: React.FC<Props> = (props): JSX.Element => {
  const { handleEditBrand, handleDeleteBrand } = props;
  const { brands, pagination, setPagination, loading } = useBrand();

  return (
    <TableGrid
      rows={brands}
      handleEdit={handleEditBrand}
      handleDelete={handleDeleteBrand}
      columns={Columns}
      {...{ loading, pagination, setPagination }}
    />
  );
};

export default BrandList;
