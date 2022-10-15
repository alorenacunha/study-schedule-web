import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { useProduct } from '../../../../context/product';
import api from '../../../../services/api';
import ProductCreateFormComponent from './ProductCreateForm.component';

export interface Props {
  handleCreateFormClose: (event?: any, reason?: string) => void;
}

const ProductCreateForm: React.FC<Props> = (props): JSX.Element => {
  const { handleSubmit, control, reset } = useForm();
  const { handleCreateFormClose } = props;
  const { currentProduct, openCreateForm, brands, categories } = useProduct();
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!openCreateForm) return;
    if (currentProduct && currentProduct.id)
      reset({
        name: currentProduct.name,
        external_id: currentProduct.external_id,
        price: currentProduct.price,
        margin: currentProduct.margin,
        brand: currentProduct.brand?.id,
        category: currentProduct.category?.id,
      });
    else
      reset({
        name: '',
        external_id: '',
        price: '',
        margin: '',
        brand: '',
        category: '',
      });
  }, [openCreateForm, currentProduct, reset]);

  const updateProduct = (data) => api.put<any>('/product/' + currentProduct?.id, { ...data });

  const saveNewProduct = (data) => api.post<any>('/product/', { ...data });

  const handleAction = (data) =>
    currentProduct && currentProduct.id ? updateProduct(data) : saveNewProduct(data);

  const handleProductFormSubmit = async (data) => {
    if (loading) return;

    setErrorFeedback(null);
    setLoading(true);

    try {
      await handleAction(data);

      toast.success(t('save.success.what', { what: t('product').toLowerCase() }));
      handleCreateFormClose();
    } catch (error) {
      toast.error(t('save.error.what', { what: t('product').toLowerCase() }));
      setErrorFeedback(t('save.error.what', { what: t('product').toLowerCase() }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductCreateFormComponent
      {...{
        openCreateForm,
        handleCreateFormClose,
        handleProductFormSubmit,
        errorFeedback,
        loading,
        categories,
        brands,
        handleSubmit,
        control,
      }}
    />
  );
};

export default ProductCreateForm;
