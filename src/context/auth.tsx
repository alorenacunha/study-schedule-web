import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../models/user.interface';

export interface AuthContextData {
  user: User | null;
  getUser: Function;
  jwtStorage: string;
  userStorage: string;
  setUserLogged: Function;
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
  const [userLogged, setUserLogged] = useState<User | null>(null);

  const jwtStorage = '@ae:token';
  const userStorage = '@ae:user';

  useEffect(() => {
    const token = localStorage.getItem(jwtStorage);
    if (!token) return navigate('/login');

    const userLocal = localStorage.getItem(userStorage);
    if (!userLocal) return navigate('/login');

    setUserLogged(JSON.parse(userLocal));
  }, []);

  const getUser = async () => {
    console.log('getUser');
    const userLocal = localStorage.getItem(userStorage);
    if (!userLocal) return navigate('/login');
    setUserLogged(JSON.parse(userLocal));
    console.log('userLocal');
    return userLocal;
  };

  return (
    <AuthContext.Provider
      value={{ user: userLogged, getUser, jwtStorage, userStorage, setUserLogged }}
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
