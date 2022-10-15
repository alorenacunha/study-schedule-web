import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useInventory } from '../../context/inventory';
import { Inventory, InventoryFilter, InventoryPayload } from '../../models/inventory.interface';
import { Resume } from '../../models/resume.interface';
import api from '../../services/api';
import { InventoryResumeType } from './components/InventoryResume/InventoryResume.component';
import InventoryValuationComponent from './InventoryValuation.component';
import Resumes from './InventoryValuation.resumes';
import { toast } from 'react-toastify';
import { t } from 'i18next';

const InventoryValuation: React.FC = (): JSX.Element => {
  const { inventories, setInventories, resume, setResume, filter, pagination, setLoading } =
    useInventory();
  const [searchValue, setSearchValue] = useState<string>('');
  const [resumesSettings, setResumesSettings] = useState<InventoryResumeType[]>(Resumes);

  const searchInput = {
    value: searchValue,
    handleSearchChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
    },
  };

  const getResume = useCallback(
    async (params: InventoryFilter) => {
      try {
        const response = await api.get<Resume>('/inventory/summary', { params });
        setResume(response.data);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('summary').toLowerCase() }));
      }
    },
    [setResume],
  );

  const getProducts = useCallback(
    async (params: InventoryPayload) => {
      setLoading(true);
      try {
        const response = await api.get<Inventory[]>('/product/inventory', { params });
        setInventories(response.data);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('inventory').toLowerCase() }));
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setInventories],
  );

  useEffect(() => {
    if (!resume) return;
    setResumesSettings((prevResumesSettings) => [
      ...prevResumesSettings.map((item) => ({
        ...item,
        value: resume[item.name],
      })),
    ]);
  }, [resume]);

  useEffect(() => {
    getResume({ ...filter });
  }, [filter, getResume]);

  useEffect(() => {
    const params: InventoryPayload = {
      _start: pagination._start,
      _limit: pagination._limit,
      q: searchValue,
      ...filter,
    };
    getProducts(params);
  }, [searchValue, filter, pagination?._start, pagination?._limit, getProducts]);

  return <InventoryValuationComponent {...{ resumesSettings, searchInput, inventories }} />;
};

export default InventoryValuation;
