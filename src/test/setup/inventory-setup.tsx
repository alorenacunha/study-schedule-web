import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { InventoryProvider } from '../../context/inventory';
import { GlobalProviders } from './global-setup';

const InventoryProviders: FC = ({ children }) => {
  return (
    <GlobalProviders>
      <InventoryProvider>{children}</InventoryProvider>
    </GlobalProviders>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: InventoryProviders, ...options });

export * from '@testing-library/react';
export { InventoryProviders };
export { customRender as render };
