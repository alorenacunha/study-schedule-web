import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { ProductContext, ProductContextData } from '../../context/product';
import { productProvidersParameters } from '../mock/product.mock';
import { GlobalProviders } from './global-setup';

const ProductProviders: FC = ({ children }) => {
  return (
    <GlobalProviders>
      <ProductContext.Provider value={{ ...(productProvidersParameters as ProductContextData) }}>
        {children}
      </ProductContext.Provider>
    </GlobalProviders>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: ProductProviders, ...options });

export * from '@testing-library/react';
export { ProductProviders };
export { customRender as render };
