import { t } from 'i18next';
import _unionBy from 'lodash/unionBy';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePurchaseOrder } from '../../context/purchaseOrder';
import {
  PurchaseOrder,
  PurchaseOrderModel,
  PurchaseOrderPayload,
} from '../../models/purchaseOrder.interface';
import api from '../../services/api.local';
import PurchaseOrderManagementComponent from './PurchaseOrderManagement.component';

const PurchaseOrderManagement: React.FC = (): JSX.Element => {
  const {
    filter,
    pagination,
    searchValue,
    setPurchaseOrders,
    setLoading,
    setCurrentPurchaseOrder,
    openPurchaseOrderForm,
    setOpenPurchaseOrderForm,
    setOpenPurchaseOrderAddProduct,
  } = usePurchaseOrder();

  const getPurchaseOrders = useCallback(
    async (params: PurchaseOrderPayload) => {
      setLoading(true);
      try {
        const response = await api.get<PurchaseOrder[]>('/purchaseOrder', { params });
        setPurchaseOrders([...response.data]);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('purchase.order').toLowerCase() }));
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setPurchaseOrders],
  );

  const handlePurchaseOrderNew = () => {
    setCurrentPurchaseOrder(PurchaseOrderModel());
    setOpenPurchaseOrderForm(true);
  };

  const handlePurchaseOrderDetails = (row) => {
    setCurrentPurchaseOrder(row);
    setOpenPurchaseOrderForm(true);
  };

  const handlePurchaseOrderFormClose = () => {
    setOpenPurchaseOrderForm(false);
  };

  const handlePurchaseOrderAddProduct = (row) => {
    setCurrentPurchaseOrder(row);
    setOpenPurchaseOrderAddProduct(true);
  };

  const handlePurchaseOrderAddProductClose = (purchaseItemsToAdd) => {
    setOpenPurchaseOrderAddProduct(false);
    if (purchaseItemsToAdd) {
      setOpenPurchaseOrderForm(true);

      setCurrentPurchaseOrder((prevCurrentPurchaseOrder) => {
        prevCurrentPurchaseOrder.purchaseItems?.forEach((item) => {
          const hasProduct = purchaseItemsToAdd.find(
            (toAdd) => toAdd.product.id == item.product.id,
          );
          if (hasProduct) item.quantity += hasProduct.quantity;
          return item;
        });

        prevCurrentPurchaseOrder.purchaseItems = _unionBy(
          prevCurrentPurchaseOrder.purchaseItems,
          purchaseItemsToAdd,
          'product.id',
        );

        return prevCurrentPurchaseOrder;
      });
    }
  };

  const handleDownload = () => {
    //TODO;
  };

  useEffect(() => {
    if (openPurchaseOrderForm) return;
    const params: PurchaseOrderPayload = {
      _start: pagination._start,
      _limit: pagination._limit,
      q: searchValue,
      ...filter,
    };
    getPurchaseOrders(params);
  }, [
    searchValue,
    filter,
    pagination?._start,
    pagination?._limit,
    getPurchaseOrders,
    openPurchaseOrderForm,
  ]);

  return (
    <PurchaseOrderManagementComponent
      {...{
        openPurchaseOrderForm,
        handleDownload,
        handlePurchaseOrderNew,
        handlePurchaseOrderDetails,
        handlePurchaseOrderFormClose,
        handlePurchaseOrderAddProduct,
        handlePurchaseOrderAddProductClose,
      }}
    />
  );
};

export default PurchaseOrderManagement;
