import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteDialogComponent from '../../../../components/DeleteDialog';
import { useBrand } from '../../../../context/brand';
import api from '../../../../services/api';

export interface Props {
  handleDeleteDialogClose: (event?: any, reason?: string) => void;
}

const BrandDeleteDialog: React.FC<Props> = (props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { handleDeleteDialogClose } = props;
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const { currentBrand, openDeleteDialog } = useBrand();
  const title = t('brand');

  useEffect(() => {
    setErrorFeedback(null);
  }, [openDeleteDialog]);

  const handleDelete = async () => {
    if (loading) return;

    if (!(currentBrand && currentBrand.id)) return;

    setErrorFeedback(null);
    setLoading(true);

    try {
      await api.delete<any>('/brand/' + currentBrand.id);

      toast.success(t('delete.success.what', { what: title }));
      handleDeleteDialogClose();
    } catch (error) {
      toast.error(t('delete.error.what', { what: title?.toLowerCase() }));
      setErrorFeedback(t('delete.error.what', { what: title?.toLowerCase() }));
    } finally {
      setLoading(false);
    }
  };
  return (
    <DeleteDialogComponent
      {...{
        title,
        openDeleteDialog,
        handleDeleteDialogClose,
        handleDelete,
        loading,
        errorFeedback,
      }}
    />
  );
};

export default BrandDeleteDialog;
