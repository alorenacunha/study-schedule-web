import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { BrandContext, BrandContextData } from '../../context/brand';
import { brandProvidersParameters } from '../mock/brand.mock';
import { GlobalProviders } from './global-setup';

const BrandProviders: FC = ({ children }) => {
  return (
    <GlobalProviders>
      <BrandContext.Provider value={{ ...(brandProvidersParameters as BrandContextData) }}>
        {children}
      </BrandContext.Provider>
    </GlobalProviders>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: BrandProviders, ...options });

export * from '@testing-library/react';
export { BrandProviders };
export { customRender as render };
