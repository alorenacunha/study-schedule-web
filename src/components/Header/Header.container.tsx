import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/auth';
import HeaderComponent from './Header.component';

const Header: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, userStorage, emailStorage, jwtStorage, setUserLogged } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const signOut = useCallback(() => {
    setUserLogged(null);
    localStorage.removeItem(userStorage);
    localStorage.removeItem(emailStorage);
    localStorage.removeItem(jwtStorage);
    navigate('/login');
  }, [userStorage, jwtStorage, navigate, setUserLogged]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <HeaderComponent {...{ signOut, user, anchorEl, handleClose, handleClick }} />;
};

export default Header;
