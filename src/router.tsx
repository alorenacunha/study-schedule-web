import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Layout from './components/Layout';
import Settings from './pages/Settings';
import Create from './pages/Create';
import Home from './pages/Home';
import Login from './pages/Login';
import Plans from './pages/Plans';

const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
