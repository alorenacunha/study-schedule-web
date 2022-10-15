import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { CategoryContext, CategoryContextData } from '../../context/category';
import { categoryProvidersParameters } from '../mock/category.mock';
import { GlobalProviders } from './global-setup';

const CategoryProviders: FC = ({ children }) => {
  return (
    <GlobalProviders>
      <CategoryContext.Provider value={{ ...(categoryProvidersParameters as CategoryContextData) }}>
        {children}
      </CategoryContext.Provider>
    </GlobalProviders>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: CategoryProviders, ...options });

export * from '@testing-library/react';
export { CategoryProviders };
export { customRender as render };
