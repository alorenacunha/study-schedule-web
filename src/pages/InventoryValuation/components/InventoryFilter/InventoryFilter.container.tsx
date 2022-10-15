import { t } from 'i18next';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FilterInputProps } from '../../../../components/FilterInput/FilterInput.container';
import { useInventory } from '../../../../context/inventory';
import { InfoObject, InfoObjectPayload } from '../../../../models/infoObject.interface';
import api from '../../../../services/api';
import InventoryFilterComponent from './InventoryFilter.component';

const InventoryFilter: React.FC = (): JSX.Element => {
  const { filter, setFilter } = useInventory();
  const [filtersSettings, setFiltersSettings] = useState<FilterInputProps[]>([
    {
      label: t('date'),
      name: 'date',
      options: [],
      optionLabel: '',
      type: 'date',
    },
    {
      label: t('category'),
      name: 'category',
      options: [],
      optionLabel: 'name',
    },
    {
      label: t('brand'),
      name: 'brand',
      options: [],
      optionLabel: 'name',
    },
  ]);

  const setOptionsFilter = useCallback((name, options) => {
    setFiltersSettings((prevFiltersSettings) => [
      ...prevFiltersSettings.map((f) => {
        if (f.name === name) f.options = options;
        return f;
      }),
    ]);
  }, []);

  const getCategoryOptions = useCallback(
    async (params: InfoObjectPayload) => {
      try {
        const response = await api.get<InfoObject[]>('/category', { params });
        setOptionsFilter('category', response.data);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('category').toLowerCase() }));
      }
    },
    [setOptionsFilter],
  );

  const getBrandOptions = useCallback(
    async (params: InfoObjectPayload) => {
      try {
        const response = await api.get<InfoObject[]>('/brand', { params });
        setOptionsFilter('brand', response.data);
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('brand').toLowerCase() }));
      }
    },
    [setOptionsFilter],
  );

  const applyFilter = (name, value) => {
    if (!value) filter[name] = null;
    else if (name === 'date') filter[name] = moment(value).format('yyyy-MM-DD');
    else filter[name] = value.id;

    setFilter({ ...filter });
  };

  useEffect(() => {
    const params: InfoObjectPayload = {
      _limit: -1,
    };
    getCategoryOptions(params);
    getBrandOptions(params);
  }, [getCategoryOptions, getBrandOptions]);

  return <InventoryFilterComponent filtersSettings={filtersSettings} applyFilter={applyFilter} />;
};

export default InventoryFilter;
