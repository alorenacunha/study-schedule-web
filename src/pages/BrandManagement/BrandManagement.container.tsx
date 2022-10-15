import { GridRowData } from '@mui/x-data-grid';
import { t } from 'i18next';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useBrand } from '../../context/brand';
import { Brand } from '../../models/brand.interface';
import api from '../../services/api';
import BrandManagementComponent from './BrandManagement.component';

const BrandManagement: React.FC = (): JSX.Element => {
  const {
    pagination,
    setPagination,
    searchValue,
    setBrands,
    setLoading,
    setCurrentBrand,
    openCreateForm,
    setOpenCreateFormModal,
    openDeleteDialog,
    setOpenDeleteDialog,
  } = useBrand();

  const handleCreateFormClose = () => {
    setCurrentBrand(null);
    setOpenCreateFormModal(false);
  };

  const handleDeleteDialogClose = () => {
    setCurrentBrand(null);
    setOpenDeleteDialog(false);
  };

  const getBrands = useCallback(
    async (paginate, filter) => {
      setLoading(true);

      try {
        const response = await api.get<Brand[]>('/brand', {
          params: { ...paginate, ...filter },
        });

        setBrands([...response.data]);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('brand').toLowerCase() }));
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setBrands],
  );

  const getBrandsCount = useCallback(
    async (filter) => {
      try {
        const result = await api.get<Brand[]>('/brand/count', { params: { ...filter } });
        setPagination((prevPagination) => ({ ...prevPagination, count: result.data }));
      } catch (error) {
        toast.error(t('failed.fetch.what.total', { what: t('brand').toLowerCase() }));
      }
    },
    [setPagination],
  );

  const handleNewBrand = () => {
    setCurrentBrand(null);
    setOpenCreateFormModal(true);
  };

  const handleEditBrand = (row: GridRowData) => {
    setCurrentBrand(row);
    setOpenCreateFormModal(true);
  };

  const handleDeleteBrand = (row: GridRowData) => {
    setCurrentBrand(row);
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

    getBrands(paginate, filter);
    getBrandsCount(filter);
  }, [
    searchValue,
    openCreateForm,
    openDeleteDialog,
    pagination?._start,
    pagination?._limit,
    getBrands,
    getBrandsCount,
  ]);
  return (
    <BrandManagementComponent
      {...{
        handleCreateFormClose,
        handleDeleteDialogClose,
        handleNewBrand,
        handleEditBrand,
        handleDeleteBrand,
      }}
    />
  );
};

export default BrandManagement;
