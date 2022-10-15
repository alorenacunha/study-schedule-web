import { GridRowData } from '@mui/x-data-grid';
import { t } from 'i18next';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCategory } from '../../context/category';
import { Category } from '../../models/category.interface';
import api from '../../services/api';
import CategoryManagementComponent from './CategoryManagement.component';

const CategoryManagement: React.FC = (): JSX.Element => {
  const {
    pagination,
    setPagination,
    searchValue,
    setCategories,
    setLoading,
    setCurrentCategory,
    openCreateForm,
    setOpenCreateFormModal,
    openDeleteDialog,
    setOpenDeleteDialog,
  } = useCategory();

  const handleCreateFormClose = () => {
    setCurrentCategory(null);
    setOpenCreateFormModal(false);
  };

  const handleDeleteDialogClose = () => {
    setCurrentCategory(null);
    setOpenDeleteDialog(false);
  };

  const getCategories = useCallback(
    async (paginate, filter) => {
      setLoading(true);

      try {
        const response = await api.get<Category[]>('/category', {
          params: { ...paginate, ...filter },
        });

        setCategories(response.data);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('category').toLowerCase() }));
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setCategories],
  );

  const getCategoriesCount = useCallback(
    async (filter) => {
      try {
        const result = await api.get<Category[]>('/category/count', { params: { ...filter } });
        setPagination((prevPagination) => ({ ...prevPagination, count: result.data }));
      } catch (error) {
        toast.error(t('failed.fetch.what.total', { what: t('category').toLowerCase() }));
      }
    },
    [setPagination],
  );

  const handleNewCategory = () => {
    setCurrentCategory(null);
    setOpenCreateFormModal(true);
  };

  const handleEditCategory = (row: GridRowData) => {
    setCurrentCategory(row);
    setOpenCreateFormModal(true);
  };

  const handleDeleteCategory = (row: GridRowData) => {
    setCurrentCategory(row);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    if (openCreateForm) return;
    if (openDeleteDialog) return;

    const paginate = {
      _start: pagination._start,
      _limit: pagination._limit,
    };
    const filter = {
      name_contains: searchValue,
    };

    getCategories(paginate, filter);
    getCategoriesCount(filter);
  }, [
    searchValue,
    openCreateForm,
    openDeleteDialog,
    pagination?._start,
    pagination?._limit,
    getCategories,
    getCategoriesCount,
  ]);
  return (
    <CategoryManagementComponent
      {...{
        handleCreateFormClose,
        handleDeleteDialogClose,
        handleNewCategory,
        handleEditCategory,
        handleDeleteCategory,
      }}
    />
  );
};

export default CategoryManagement;
