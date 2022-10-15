import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, AuthResponse } from '../../context/auth';
import { UserForm } from '../../models/user.interface';
import api from '../../services/api';
import LoginComponent from './Login.component';
import { toast } from 'react-toastify';
import { t } from 'i18next';

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { setUserLogged, userStorage, jwtStorage } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  const signIn = useCallback(
    async (data: UserForm) => {
      try {
        const response = await api.post<AuthResponse>('/auth/local', data);

        const { jwt, user } = response.data;
        setUserLogged(user);
        localStorage.setItem(userStorage, JSON.stringify(user));
        localStorage.setItem(jwtStorage, jwt);
      } catch (error) {
        toast.error(t('signin.incorrect'));
      }
      navigate('/');
    },
    [userStorage, jwtStorage, setUserLogged, navigate],
  );

  const onLoginFormSubmit = async (data: UserForm) => {
    if (loading) return;

    setErrorFeedback(null);
    setLoading(true);

    try {
      await signIn(data);
      window.history.pushState({}, '', '/');
    } catch (error) {
      setErrorFeedback(t('signin.incorrect'));
      toast.error(t('signin.incorrect'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginComponent
      loading={loading}
      onLoginFormSubmit={onLoginFormSubmit}
      errorFeedback={errorFeedback}
    />
  );
};

export default Login;
