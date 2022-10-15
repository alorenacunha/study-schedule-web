import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout';
import { BrandProvider } from './context/brand';
import { CategoryProvider } from './context/category';
import { InventoryProvider } from './context/inventory';
import { ProductProvider } from './context/product';
import { PurchaseOrderProvider } from './context/purchaseOrder';
import BrandManagement from './pages/BrandManagement';
import CategoryManagement from './pages/CategoryManagement';
import Home from './pages/Home';
import InventoryValuation from './pages/InventoryValuation';
import Login from './pages/Login';
import ProductManagement from './pages/ProductManagement';
import PurchaseOrderManagement from './pages/PurchaseOrderManagement';

const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route
              path="/purchaseOrder"
              element={
                <PurchaseOrderProvider>
                  <PurchaseOrderManagement />
                </PurchaseOrderProvider>
              }
            />
            <Route
              path="/inventory"
              element={
                <InventoryProvider>
                  <InventoryValuation />
                </InventoryProvider>
              }
            />
            <Route
              path="/product"
              element={
                <ProductProvider>
                  <ProductManagement />
                </ProductProvider>
              }
            />
            <Route
              path="/category"
              element={
                <CategoryProvider>
                  <CategoryManagement />
                </CategoryProvider>
              }
            />
            <Route
              path="/brand"
              element={
                <BrandProvider>
                  <BrandManagement />
                </BrandProvider>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
