import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { PurchaseOrderProvider } from '../../context/purchaseOrder';
import { GlobalProviders } from './global-setup';

const PurchaseOrderProviders: FC = ({ children }) => {
  return (
    <GlobalProviders>
      <PurchaseOrderProvider>{children}</PurchaseOrderProvider>
    </GlobalProviders>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: PurchaseOrderProviders, ...options });

export * from '@testing-library/react';
export { PurchaseOrderProviders };
export { customRender as render };
