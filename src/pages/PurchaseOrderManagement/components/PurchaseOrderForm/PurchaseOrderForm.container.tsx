import { GridCellEditCommitParams, GridRowData } from '@mui/x-data-grid';
import { t } from 'i18next';
import _sumBy from 'lodash/sumBy';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePurchaseOrder } from '../../../../context/purchaseOrder';
import { PurchaseOrder } from '../../../../models/purchaseOrder.interface';
import api from '../../../../services/api.local';
import PurchaseOrderFormComponent from './PurchaseOrderForm.component';

interface Props {
  handlePurchaseOrderFormClose: () => void;
  handlePurchaseOrderAddProduct: (row: GridRowData | null) => void;
  handleDownload: () => void;
}

const PurchaseOrderForm: React.FC<Props> = (props): JSX.Element => {
  const { handlePurchaseOrderFormClose, handlePurchaseOrderAddProduct, handleDownload } = props;
  const {
    openPurchaseOrderForm,
    currentPurchaseOrder,
    setCurrentPurchaseOrder,
    openPurchaseOrderAddProduct,
    searchValue,
    setSearchValue,
  } = usePurchaseOrder();
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [newPurchaseOrder, setNewPurchaseOrder] = useState({
    name: '',
    vendor: '',
  });

  useEffect(() => {
    if (!openPurchaseOrderForm) return;
    const currentPurchaseOrderExist = currentPurchaseOrder && currentPurchaseOrder.id;
    setSelectedStatus(currentPurchaseOrder.status);
    if (!currentPurchaseOrderExist) {
      setNewPurchaseOrder({
        name: '',
        vendor: '',
      });
    }
  }, [openPurchaseOrderForm, currentPurchaseOrder]);

  const handleCellEditCommit = useCallback(
    (cell: GridCellEditCommitParams) => {
      if (cell.field != 'quantity') return;
      setCurrentPurchaseOrder((prevCurrentPurchaseOrder) => {
        prevCurrentPurchaseOrder.purchaseItems = prevCurrentPurchaseOrder?.purchaseItems?.map(
          (row, index) => {
            if (index === cell.id) {
              return { ...row, quantity: Number(cell.value?.toString()) };
            }
            return row;
          },
        );
        return prevCurrentPurchaseOrder;
      });
    },
    [setCurrentPurchaseOrder],
  );

  const updatePurchaseOrder = (data) =>
    api.put<any>('/purchaseOrder/' + currentPurchaseOrder?.id, { ...data });

  const saveNewPurchaseOrder = (data) => api.post<any>('/purchaseOrder/', { ...data });

  const handlePurchaseOrderFormSubmit = async () => {
    if (loading) return;

    setErrorFeedback(null);
    setLoading(true);
    try {
      const currentPurchaseOrderDoesExist = currentPurchaseOrder && currentPurchaseOrder.id;

      let updatedPurchaseOrder: PurchaseOrder = {
        ...currentPurchaseOrder,
        amount: _sumBy(
          currentPurchaseOrder.purchaseItems,
          (item) => item.product.price * item.quantity,
        ),
        quantity: _sumBy(currentPurchaseOrder.purchaseItems, 'quantity'),
      };

      if (currentPurchaseOrderDoesExist) {
        updatePurchaseOrder(updatedPurchaseOrder);
      } else {
        updatedPurchaseOrder.name = newPurchaseOrder.name;
        updatedPurchaseOrder.vendor = newPurchaseOrder.vendor;
        saveNewPurchaseOrder(updatedPurchaseOrder);
      }
      toast.success(t('save.success.what', { what: t('purchase.order').toLowerCase() }));
      handlePurchaseOrderFormClose();
    } catch (error) {
      toast.error(t('save.error.what', { what: t('purchase.order').toLowerCase() }));
      setErrorFeedback(t('save.error.what', { what: t('purchase.order').toLowerCase() }));
    } finally {
      setLoading(false);
    }
  };

  const searchInput = {
    value: searchValue,
    handleSearchChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
    },
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPurchaseOrder((prevCurrentPurchaseOrder) => {
      prevCurrentPurchaseOrder.status = value;
      prevCurrentPurchaseOrder[value + '_at'] = new Date().toUTCString();
      return prevCurrentPurchaseOrder;
    });
  };

  const handleDeliveredSelection = (ids) => {
    setCurrentPurchaseOrder((prevCurrentPurchaseOrder) => {
      prevCurrentPurchaseOrder.purchaseItems.forEach((item) => {
        if (ids.find((id) => id == item.id)) item.delivered = true;
      });
      return prevCurrentPurchaseOrder;
    });
  };

  return (
    <PurchaseOrderFormComponent
      {...{
        errorFeedback,
        loading,
        searchInput,
        selectedStatus,
        currentPurchaseOrder,
        newPurchaseOrder,
        setNewPurchaseOrder,
        handleCellEditCommit,
        handleStatusChange,
        handleDeliveredSelection,
        handlePurchaseOrderFormSubmit,
        handlePurchaseOrderFormClose,
        openPurchaseOrderAddProduct,
        handlePurchaseOrderAddProduct,
        handleDownload,
      }}
    />
  );
};

export default PurchaseOrderForm;
