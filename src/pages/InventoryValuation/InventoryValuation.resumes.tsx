import { AccountBalance, Work } from '@material-ui/icons';
import { t } from 'i18next';
import { formatCurrency, formatPercent } from '../../utils/utils';
import { InventoryResumeType } from './components/InventoryResume/InventoryResume.component';

const resumes: InventoryResumeType[] = [
  {
    iconAvatar: Work,
    description: t('wholesale.value'),
    name: 'wholesale',
    value: 0,
    format: (number) => formatCurrency(number),
    color: 'primary',
  },
  {
    iconAvatar: AccountBalance,
    description: t('retail.value'),
    name: 'retail',
    value: 0,
    format: (number) => formatCurrency(number),
    color: 'secondary',
  },
  {
    iconAvatar: AccountBalance,
    description: t('profit'),
    name: 'profit',
    value: 0,
    format: (number) => formatCurrency(number),
    color: 'secondary',
  },
  {
    iconAvatar: AccountBalance,
    description: t('margin'),
    name: 'margin',
    value: 0,
    format: (number) => formatPercent(number),
    color: 'secondary',
  },
];

export default resumes;
