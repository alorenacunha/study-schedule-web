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
  const { setUserLogged, userStorage, setEmailLogged, emailStorage, jwtStorage } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  const signIn = useCallback(
    async (data: UserForm) => {
      try {
        const response = await api.post<AuthResponse>('/auth/signin', data);

        const { auth, token, user } = response.data;
        if (!auth) {
          return toast.error(t('signin.incorrect'));
        }

        localStorage.setItem(userStorage, user.name);
        setUserLogged(user.name);
        localStorage.setItem(emailStorage, user.userId);
        setEmailLogged(user.userId);
        localStorage.setItem(jwtStorage, token);

        navigate('/');
      } catch (error: any) {
        if (error.response.status === 404) {
          setErrorFeedback(t('server.not.found'));
        }
        if (error.response.status === 401) {
          setErrorFeedback(t('unauthorized'));
        }
        if (error.response.status === 400) {
          setErrorFeedback(t('signin.incorrect'));
        }
      }
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
