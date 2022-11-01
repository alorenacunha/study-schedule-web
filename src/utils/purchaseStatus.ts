import { t } from 'i18next';

export const PURCHASE_ORDER_STATUS = [
  {
    id:0,
    name: 'open',
    label: t('open'),
    color: 'yellow',
  },
  {
    id:1,
    name: 'sent',
    label: t('sent'),
    color: 'blue',
  },
  {
    id:2,
    name: 'received',
    label: t('received'),
    color: 'green',
  },
  {
    id:3,
    name: 'voided',
    label: t('voided'),
    color: 'gray',
  },
];
