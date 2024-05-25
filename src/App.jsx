import { Routes, Route } from 'react-router-dom';
import ProductProvider from './contexts/ProductProvider';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import CartPage from './pages/Cart';
import ReturnsPage from './pages/Returns';
import ProductPage from './pages/Product';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SearchPage from './pages/Search';
import './styles/App.css';

function App() {
  const routes = [
    { path: '/about', element: <AboutPage /> },
    { path: '/', element: <HomePage /> },
    { path: '/returns', element: <ReturnsPage /> },
    { path: '/products/:id', element: <ProductPage /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/search', element: <SearchPage /> },
  ];

  return (
    <div id='container'>
      <ProductProvider>
        <NavBar />
        <Routes>
          {/* TODO : Complétez le liens de toutes les routes sans utiliser simplement les indexes */}
          {/* <Route path={routes[0].path} element={routes[0].element} /> */}
          {/* <Route path={routes[1].path} element={routes[1].element} /> */}
          {routes.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} />;
          })}
        </Routes>
        <Footer />
      </ProductProvider>
    </div>
  );
}

export default App;
