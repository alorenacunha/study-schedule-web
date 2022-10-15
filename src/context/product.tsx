import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Pagination } from '../models/pagination.interface';
import { Product } from '../models/product.interface';
import { Brand } from '../models/brand.interface';
import { Category } from '../models/category.interface';

export interface ProductContextData {
  products: Product[];
  setProducts: Function;
  brands: Brand[];
  setBrands: Function;
  categories: Category[];
  setCategories: Function;
  pagination: Pagination;
  setPagination: Function;
  loading: boolean;
  setLoading: Function;
  currentProduct: Product | undefined;
  setCurrentProduct: Function;
  openCreateForm: boolean;
  setOpenCreateFormModal: Function;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Function;
  searchValue: string;
  setSearchValue: Function;
}

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext({} as ProductContextData);

const ProductProvider: React.FC<ProductProviderProps> = (props): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<Product>({});
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
    <ProductContext.Provider
      value={{
        pagination,
        setPagination,
        loading,
        setLoading,
        products,
        setProducts,
        brands,
        setBrands,
        categories,
        setCategories,
        currentProduct,
        setCurrentProduct,
        openCreateForm,
        setOpenCreateFormModal,
        openDeleteDialog,
        setOpenDeleteDialog,
        searchValue,
        setSearchValue,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

const useProduct = (): ProductContextData => {
  const context = useContext(ProductContext);
  return context;
};

export { ProductProvider, useProduct, ProductContext };
