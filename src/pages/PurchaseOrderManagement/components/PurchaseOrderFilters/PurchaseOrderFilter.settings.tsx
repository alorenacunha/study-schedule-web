import { t } from 'i18next';
import { FilterInputProps } from '../../../../components/FilterInput/FilterInput.container';
import { PURCHASE_ORDER_STATUS } from '../../../../utils/purchaseStatus';

const filterSettings: FilterInputProps[] = [
  {
    label: t('date.initial'),
    name: 'date_initial',
    type: 'date',
  },
  {
    label: t('date.final'),
    name: 'date_final',
    type: 'date',
  },
  {
    label: t('status'),
    name: 'status',
    options: PURCHASE_ORDER_STATUS,
    optionLabel: 'label',
  },
  {
    label: t('product.id'),
    name: 'product_id',
    options: [],
  },
  {
    label: t('product.name'),
    name: 'product_name',
    options: [],
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
];

export default filterSettings;
