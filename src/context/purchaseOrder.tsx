import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Pagination } from '../models/pagination.interface';
import { Product } from '../models/product.interface';
import {
  PurchaseOrder,
  PurchaseOrderFilter,
  PurchaseOrderModel,
} from '../models/purchaseOrder.interface';

export interface PurchaseOrderContextData {
  purchaseOrders: PurchaseOrder[];
  setPurchaseOrders: Function;
  pagination: Pagination;
  setPagination: Function;
  loading: boolean;
  setLoading: Function;
  currentPurchaseOrder: PurchaseOrder;
  setCurrentPurchaseOrder: Function;
  openPurchaseOrderForm: boolean;
  setOpenPurchaseOrderForm: Function;
  openPurchaseOrderAddProduct: boolean;
  setOpenPurchaseOrderAddProduct: Function;
  filter: PurchaseOrderFilter;
  setFilter: (params: PurchaseOrderFilter) => void;
  products: Product[];
  setProducts: Function;
  searchValue: string;
  setSearchValue: Function;
}

interface PurchaseOrderProviderProps {
  children: ReactNode;
}

const PurchaseOrderContext = createContext({} as PurchaseOrderContextData);

const PurchaseOrderProvider: React.FC<PurchaseOrderProviderProps> = (props): JSX.Element => {
  const [filter, setFilter] = useState<PurchaseOrderFilter>({});
  const [searchValue, setSearchValue] = useState<string>('');

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPurchaseOrder, setCurrentPurchaseOrder] = useState<PurchaseOrder>(
    PurchaseOrderModel(),
  );
  const [openPurchaseOrderForm, setOpenPurchaseOrderForm] = useState<boolean>(false);
  const [openPurchaseOrderAddProduct, setOpenPurchaseOrderAddProduct] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    _limit: 10,
    _start: 0,
    pageSize: 5,
    count: 100,
  });

  return (
    <PurchaseOrderContext.Provider
      value={{
        filter,
        setFilter,
        searchValue,
        setSearchValue,
        pagination,
        setPagination,
        loading,
        setLoading,
        purchaseOrders,
        setPurchaseOrders,
        currentPurchaseOrder,
        setCurrentPurchaseOrder,
        openPurchaseOrderForm,
        setOpenPurchaseOrderForm,
        openPurchaseOrderAddProduct,
        setOpenPurchaseOrderAddProduct,
        products,
        setProducts,
      }}
    >
      {props.children}
    </PurchaseOrderContext.Provider>
  );
};

const usePurchaseOrder = (): PurchaseOrderContextData => {
  const context = useContext(PurchaseOrderContext);
  return context;
};

export { PurchaseOrderProvider, usePurchaseOrder, PurchaseOrderContext };
