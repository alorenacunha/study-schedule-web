import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../models/user.interface';

export interface AuthContextData {
  user: User | null;
  jwtStorage: string;
  userStorage: string;
  setUserLogged: Function;
}

export interface AuthResponse {
  user: User;
  jwt: string;
}

interface AuthenticateProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthenticateProvider> = (props): JSX.Element => {
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState<User | null>(null);

  const jwtStorage = '@bops:token';
  const userStorage = '@bops:user';

  useEffect(() => {
    const token = localStorage.getItem(jwtStorage);
    if (!token) return navigate('/login');

    const userLocal = localStorage.getItem(userStorage);
    if (!userLocal) return navigate('/login');

    setUserLogged(JSON.parse(userLocal));
  }, [navigate, setUserLogged]);

  return (
    <AuthContext.Provider value={{ user: userLogged, jwtStorage, userStorage, setUserLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth, AuthContext };
