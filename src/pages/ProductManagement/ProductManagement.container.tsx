import { GridRowData } from '@mui/x-data-grid';
import { useCallback, useEffect } from 'react';
import { useProduct } from '../../context/product';
import { InfoObject, InfoObjectPayload } from '../../models/infoObject.interface';
import { Product } from '../../models/product.interface';
import api from '../../services/api';
import ProductManagementComponent from './ProductManagement.component';
import { toast } from 'react-toastify';
import { t } from 'i18next';

const ProductManagement: React.FC = (): JSX.Element => {
  const {
    pagination,
    setPagination,
    searchValue,
    setProducts,
    setCategories,
    setBrands,
    setLoading,
    setCurrentProduct,
    openCreateForm,
    setOpenCreateFormModal,
    openDeleteDialog,
    setOpenDeleteDialog,
  } = useProduct();

  const handleCreateFormClose = () => {
    setCurrentProduct(null);
    setOpenCreateFormModal(false);
  };

  const handleDeleteDialogClose = () => {
    setCurrentProduct(null);
    setOpenDeleteDialog(false);
  };

  const getProducts = useCallback(
    async (paginate, filter) => {
      setLoading(true);

      try {
        const response = await api.get<Product[]>('/product', {
          params: { ...paginate, ...filter },
        });

        setProducts(response.data);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('product').toLowerCase() }));
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setProducts],
  );

  const getProductsCount = useCallback(
    async (filter) => {
      try {
        const result = await api.get<Product[]>('/product/count', { params: { ...filter } });
        setPagination((prevPagination) => ({ ...prevPagination, count: result.data }));
      } catch (error) {
        toast.error(t('failed.fetch.what.total', { what: t('product').toLowerCase() }));
      }
    },
    [setPagination],
  );

  const getCategoryOptions = useCallback(
    async (params: InfoObjectPayload) => {
      try {
        const response = await api.get<InfoObject[]>('/category', { params });
        setCategories(response.data);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('categroy').toLowerCase() }));
      }
    },
    [setCategories],
  );

  const getBrandOptions = useCallback(
    async (params: InfoObjectPayload) => {
      try {
        const response = await api.get<InfoObject[]>('/brand', { params });
        setBrands(response.data);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('brand').toLowerCase() }));
      }
    },
    [setBrands],
  );

  const handleNewProduct = () => {
    setCurrentProduct(null);
    setOpenCreateFormModal(true);
  };

  const handleEditProduct = (row: GridRowData) => {
    setCurrentProduct(row);
    setOpenCreateFormModal(true);
  };

  const handleDeleteProduct = (row: GridRowData) => {
    setCurrentProduct(row);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    const params: InfoObjectPayload = {
      _limit: -1,
    };
    getCategoryOptions(params);
    getBrandOptions(params);
  }, [getCategoryOptions, getBrandOptions]);

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

    getProducts(paginate, filter);
    getProductsCount(filter);
  }, [
    searchValue,
    openCreateForm,
    openDeleteDialog,
    pagination?._start,
    pagination?._limit,
    getProducts,
    getProductsCount,
  ]);

  return (
    <ProductManagementComponent
      {...{
        handleCreateFormClose,
        handleDeleteDialogClose,
        handleNewProduct,
        handleEditProduct,
        handleDeleteProduct,
      }}
    />
  );
};

export default ProductManagement;
