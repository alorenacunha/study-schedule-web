import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Inventory, InventoryFilter } from '../models/inventory.interface';
import { Pagination } from '../models/pagination.interface';
import { Resume } from '../models/resume.interface';

export interface InventoryContextData {
  inventories: Inventory[];
  setInventories: (params: Inventory[]) => void;
  resume: Resume;
  setResume: (params: Resume) => void;
  filter: InventoryFilter;
  setFilter: (params: InventoryFilter) => void;
  pagination: any;
  setPagination: (params) => void;
  loading: boolean;
  setLoading: (params) => void;
}

interface InventoryProviderProps {
  children: ReactNode;
}

const InventoryContext = createContext({} as InventoryContextData);

const InventoryProvider: React.FC<InventoryProviderProps> = (props): JSX.Element => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<Resume>({
    date: new Date(),
    margin: 0,
    profit: 0,
    retail: 0,
    wholesale: 0,
  });
  const [filter, setFilter] = useState<InventoryFilter>({});
  const [pagination, setPagination] = useState<Pagination>({
    _limit: 5,
    _start: 0,
    pageSize: 5,
    count: 100,
  });

  return (
    <InventoryContext.Provider
      value={{
        inventories,
        setInventories,
        resume,
        setResume,
        filter,
        setFilter,
        pagination,
        setPagination,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </InventoryContext.Provider>
  );
};

const useInventory = (): InventoryContextData => {
  const context = useContext(InventoryContext);
  return context;
};

export { InventoryProvider, useInventory, InventoryContext };
