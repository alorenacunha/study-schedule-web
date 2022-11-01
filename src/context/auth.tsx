import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../models/user.interface';

export interface AuthContextData {
  user: string | null;
  email: string | null;
  getUser: Function;
  getEmail: Function;
  jwtStorage: string;
  userStorage: string;
  emailStorage: string;
  setUserLogged: Function;
  setEmailLogged: Function;
}

export interface AuthResponse {
  auth: boolean;
  token: string;
  user: User;
}

interface AuthenticateProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthenticateProvider> = (props): JSX.Element => {
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState<string | null>(null);
  const [emailLogged, setEmailLogged] = useState<string | null>(null);

  const jwtStorage = '@ae:token';
  const userStorage = '@ae:user';
  const emailStorage = '@ae:email';

  useEffect(() => {
    const token = localStorage.getItem(jwtStorage);
    if (!token) return navigate('/login');

    const userLocal = localStorage.getItem(userStorage);
    if (!userLocal) return navigate('/login');

    const emailLocal = localStorage.getItem(emailStorage);
    if (!emailLocal) return navigate('/login');

    setUserLogged(userLocal);
    setEmailLogged(emailLocal);
  }, []);

  const getUser = () => {
    const userLocal = localStorage.getItem(userStorage);
    setUserLogged(userLocal);
    return userLocal;
  };

  const getEmail = () => {
    const emailLocal = localStorage.getItem(emailStorage);
    setEmailLogged(emailLocal);
    return emailLocal;
  };

  return (
    <AuthContext.Provider
      value={{
        jwtStorage,
        user: userLogged,
        email: emailLogged,
        userStorage,
        emailStorage,
        getUser,
        getEmail,
        setUserLogged,
        setEmailLogged,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth, AuthContext };
