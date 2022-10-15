import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCategory } from '../../../../context/category';
import api from '../../../../services/api';
import CategoryFormComponent from './CategoryForm.component';

export interface Props {
  handleCreateFormClose: (event?: any, reason?: string) => void;
}

const CategoryForm: React.FC<Props> = (props): JSX.Element => {
  const { handleSubmit, control, reset } = useForm();
  const { handleCreateFormClose } = props;
  const { currentCategory, openCreateForm, categories } = useCategory();
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!openCreateForm) return;
    if (currentCategory && currentCategory.id)
      reset({
        name: currentCategory.name,
        external_id: currentCategory.external_id,
        parent: currentCategory.parent ? currentCategory.parent.id : '',
      });
    else
      reset({
        name: '',
        external_id: '',
        parent: '',
      });
  }, [openCreateForm, currentCategory, reset]);

  const updateCategory = (data) => api.put<any>('/category/' + currentCategory?.id, { ...data });

  const saveNewCategory = (data) => api.post<any>('/category/', { ...data });

  const handleAction = (data) =>
    currentCategory && currentCategory.id ? updateCategory(data) : saveNewCategory(data);

  const handleCategoryFormSubmit = async (data) => {
    if (loading) return;

    setErrorFeedback(null);
    setLoading(true);

    try {
      await handleAction(data);

      toast.success(t('save.success.what', { what: t('category').toLowerCase() }));
      handleCreateFormClose();
    } catch (error) {
      toast.error(t('save.error.what', { what: t('category').toLowerCase() }));
      setErrorFeedback(t('save.error.what', { what: t('category').toLowerCase() }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryFormComponent
      {...{
        openCreateForm,
        handleCreateFormClose,
        handleCategoryFormSubmit,
        errorFeedback,
        loading,
        categories,
        handleSubmit,
        control,
      }}
    />
  );
};

export default CategoryForm;
