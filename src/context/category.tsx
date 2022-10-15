import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Category } from '../models/category.interface';
import { Pagination } from '../models/pagination.interface';

export interface CategoryContextData {
  categories: Category[];
  setCategories: Function;
  pagination: Pagination;
  setPagination: Function;
  loading: boolean;
  setLoading: Function;
  currentCategory: Category | null;
  setCurrentCategory: Function;
  openCreateForm: boolean;
  setOpenCreateFormModal: Function;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Function;
  searchValue: string;
  setSearchValue: Function;
}

interface CategoryProviderProps {
  children: ReactNode;
}

const CategoryContext = createContext({} as CategoryContextData);

const CategoryProvider: React.FC<CategoryProviderProps> = (props): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
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
    <CategoryContext.Provider
      value={{
        pagination,
        setPagination,
        loading,
        setLoading,
        categories,
        setCategories,
        currentCategory,
        setCurrentCategory,
        openCreateForm,
        setOpenCreateFormModal,
        openDeleteDialog,
        setOpenDeleteDialog,
        searchValue,
        setSearchValue,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

const useCategory = (): CategoryContextData => {
  const context = useContext(CategoryContext);
  return context;
};

export { CategoryProvider, useCategory, CategoryContext };
