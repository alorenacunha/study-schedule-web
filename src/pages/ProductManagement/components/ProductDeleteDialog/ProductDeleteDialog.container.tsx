import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteDialogComponent from '../../../../components/DeleteDialog';
import { useProduct } from '../../../../context/product';
import api from '../../../../services/api';

export interface Props {
  handleDeleteDialogClose: () => void;
}
const ProductDeleteDialog: React.FC<Props> = (props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { handleDeleteDialogClose } = props;
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const { currentProduct, openDeleteDialog } = useProduct();

  const title = t('product');

  useEffect(() => {
    setErrorFeedback(null);
  }, [openDeleteDialog]);

  const handleDelete = async () => {
    if (loading) return;

    const currentProductDoesNotExist = !(currentProduct && currentProduct.id);

    if (currentProductDoesNotExist) return;

    setErrorFeedback(null);
    setLoading(true);

    try {
      await api.delete<any>('/product/' + currentProduct.id);

      toast.success(t('delete.success.what', { what: title }));
      handleDeleteDialogClose();
    } catch (error) {
      toast.error(t('delete.error.what', { what: title.toLowerCase() }));
      setErrorFeedback(t('delete.error.what', { what: title.toLowerCase() }));
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

export default ProductDeleteDialog;
