import { t } from 'i18next';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FilterInputProps } from '../../../../components/FilterInput/FilterInput.container';
import { usePurchaseOrder } from '../../../../context/purchaseOrder';
import { InfoObject, InfoObjectPayload } from '../../../../models/infoObject.interface';
import { Product } from '../../../../models/product.interface';
import api from '../../../../services/api';
import filterSettings from './PurchaseOrderFilter.settings';
import PurchaseOrderFiltersComponent from './PurchaseOrderFilters.component';

const PurchaseOrderFilters: React.FC = (): JSX.Element => {
  const { filter, setFilter, setProducts } = usePurchaseOrder();
  const [filtersSettings, setFiltersSettings] = useState<FilterInputProps[]>(filterSettings);

  const setOptionsFilter = useCallback((name, options) => {
    setFiltersSettings((prevFiltersSettings) => [
      ...prevFiltersSettings.map((f) => {
        if (f.name === name) f.options = options;
        return f;
      }),
    ]);
  }, []);

  const getProductsOptions = useCallback(
    async (params: InfoObjectPayload) => {
      try {
        const response = await api.get<Product[]>('/product', { params });
        const products = response.data;
        setProducts(products);
        setOptionsFilter(
          'product_id',
          products.map((product) => String(product.id)),
        );
        setOptionsFilter(
          'product_name',
          products.map((product) => product.name),
        );
      } catch (error) {
        toast.error(t('failed.fetch.what', { what: t('product').toLowerCase() }));
      }
    },
    [setOptionsFilter, setProducts],
  );

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
    getProductsOptions(params);
  }, [getCategoryOptions, getBrandOptions, getProductsOptions]);

  return <PurchaseOrderFiltersComponent {...{ filtersSettings, applyFilter }} />;
};

export default PurchaseOrderFilters;
