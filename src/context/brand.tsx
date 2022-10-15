import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Brand } from '../models/brand.interface';
import { Pagination } from '../models/pagination.interface';

export interface BrandContextData {
  brands: Brand[];
  setBrands: Function;
  pagination: Pagination;
  setPagination: Function;
  loading: boolean;
  setLoading: Function;
  currentBrand: Brand | null;
  setCurrentBrand: Function;
  openCreateForm: boolean;
  setOpenCreateFormModal: Function;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Function;
  searchValue: string;
  setSearchValue: Function;
}

interface BrandProviderProps {
  children: ReactNode;
}

const BrandContext = createContext({} as BrandContextData);

const BrandProvider: React.FC<BrandProviderProps> = (props): JSX.Element => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const [openCreateForm, setOpenCreateFormModal] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    _limit: 10,
    _start: 0,
    pageSize: 5,
    count: 100,
  });

  return (
    <BrandContext.Provider
      value={{
        pagination,
        setPagination,
        loading,
        setLoading,
        brands,
        setBrands,
        currentBrand,
        setCurrentBrand,
        openCreateForm,
        setOpenCreateFormModal,
        openDeleteDialog,
        setOpenDeleteDialog,
        searchValue,
        setSearchValue,
      }}
    >
      {props.children}
    </BrandContext.Provider>
  );
};

const useBrand = (): BrandContextData => {
  const context = useContext(BrandContext);
  return context;
};

export { BrandProvider, useBrand, BrandContext };
