import React, { createContext, ReactNode, useContext, useState } from 'react';
import { UserSettings } from '../models/settings.interface';
import { User } from '../models/user.interface';

export interface SettingsContextData {
  currentSettings: UserSettings | null;
  setCurrentSettings: Function;
}

export interface SettingsResponse {
  auth: boolean;
  token: string;
  user: User;
}

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsContext = createContext({} as SettingsContextData);

const SettingsProvider: React.FC<SettingsProviderProps> = (props): JSX.Element => {
  const [currentSettings, setCurrentSettings] = useState<UserSettings | null>(null);

  return (
    <SettingsContext.Provider value={{ currentSettings, setCurrentSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

const useSettings = (): SettingsContextData => {
  const context = useContext(SettingsContext);
  return context;
};

export { SettingsProvider, useSettings, SettingsContext };
