import {
  Category,
  HomeOutlined,
  LocalMall,
  LocalOffer,
  ShoppingCart,
  ShowChartRounded,
} from '@material-ui/icons';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import SideBarComponent from './SideBar.component';

const SideBar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const goTo = (route) => {
    navigate(route);
  };

  const menu = [
    {
      icon: HomeOutlined,
      label: t('home'),
      route: '/',
    },
    {
      icon: ShoppingCart,
      label: t('purchase.order'),
      route: '/purchaseOrder',
    },
    {
      icon: ShowChartRounded,
      label: t('inventory'),
      route: '/inventory',
    },
    {
      icon: LocalMall,
      label: t('product'),
      route: '/product',
    },
    {
      icon: Category,
      label: t('category'),
      route: '/category',
    },
    {
      icon: LocalOffer,
      label: t('brand'),
      route: '/brand',
    },
  ];

  return <SideBarComponent {...{ goTo, menu }} />;
};

export default SideBar;
