import { GridRowData } from '@mui/x-data-grid';
import TableGrid from '../../../../components/TableGrid';
import { useCategory } from '../../../../context/category';
import Columns from './CategoryList.columns';

export interface Props {
  handleEditCategory: (row: GridRowData) => void;
  handleDeleteCategory: (row: GridRowData) => void;
}

const CategoryList: React.FC<Props> = (props): JSX.Element => {
  const { handleEditCategory, handleDeleteCategory } = props;
  const { categories, pagination, setPagination, loading } = useCategory();

  return (
    <TableGrid
      rows={categories}
      handleEdit={handleEditCategory}
      handleDelete={handleDeleteCategory}
      columns={Columns}
      {...{ loading, pagination, setPagination }}
    />
  );
};

export default CategoryList;
