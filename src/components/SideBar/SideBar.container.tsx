import { AddOutlined, CalendarToday, Folder, Settings } from '@material-ui/icons';
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
      icon: CalendarToday,
      label: t('calendar'),
      route: '/',
    },
    {
      icon: Folder,
      label: t('study.plans'),
      route: '/plans',
    },
    {
      icon: AddOutlined,
      label: t('add.new'),
      route: '/create',
    },
    {
      icon: Settings,
      label: t('settings'),
      route: '/settings',
    },
  ];

  return <SideBarComponent {...{ goTo, menu }} />;
};

export default SideBar;
