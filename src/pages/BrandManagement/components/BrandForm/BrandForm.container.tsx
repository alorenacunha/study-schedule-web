import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useBrand } from '../../../../context/brand';
import api from '../../../../services/api';
import BrandFormComponent from './BrandForm.component';

export interface Props {
  handleCreateFormClose: (event?: any, reason?: string) => void;
}

const BrandForm: React.FC<Props> = (props): JSX.Element => {
  const { handleSubmit, control, reset } = useForm();
  const { handleCreateFormClose } = props;
  const { currentBrand, openCreateForm } = useBrand();
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!openCreateForm) return;
    if (currentBrand && currentBrand.id)
      reset({
        name: currentBrand.name,
        external_id: currentBrand.external_id,
      });
    else
      reset({
        name: '',
        external_id: '',
      });
  }, [openCreateForm, currentBrand, reset]);

  const updateBrand = (data) => api.put<any>('/brand/' + currentBrand?.id, { ...data });

  const saveNewBrand = (data) => api.post<any>('/brand/', { ...data });

  const handleAction = (data) =>
    currentBrand && currentBrand.id ? updateBrand(data) : saveNewBrand(data);

  const handleBrandFormSubmit = async (data) => {
    if (loading) return;

    setErrorFeedback(null);
    setLoading(true);

    try {
      await handleAction(data);

      toast.success(t('save.success.what', { what: t('brand').toLowerCase() }));
      handleCreateFormClose();
    } catch (error) {
      toast.error(t('save.error.what', { what: t('brand').toLowerCase() }));
      setErrorFeedback(t('save.error.what', { what: t('brand').toLowerCase() }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrandFormComponent
      {...{
        openCreateForm,
        handleCreateFormClose,
        handleBrandFormSubmit,
        errorFeedback,
        loading,
        handleSubmit,
        control,
      }}
    />
  );
};

export default BrandForm;
