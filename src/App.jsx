import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from './store/productSlice';
import Discover from './components/Discover';
import ProductList from './components/ProductList';
import { HiOutlineHeart, HiOutlineShoppingCart, HiOutlineX, HiOutlineHome } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.slice(1) || 'discover';
  
  const { likedProducts, passedProducts, cartProducts } = useSelector(state => state.products);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 safe-area-bottom">
      <div className="max-w-lg mx-auto px-4 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
            className={`p-2.5 sm:p-3 rounded-full ${activeTab === 'discover' ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            <HiOutlineHome className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/passed')}
              className={`p-2.5 sm:p-3 rounded-full ${activeTab === 'passed' ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'bg-gray-100 text-gray-500'} relative`}
            >
              <HiOutlineX className="w-5 h-5 sm:w-6 sm:h-6" />
              {passedProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {passedProducts.length}
                </span>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/liked')}
              className={`p-2.5 sm:p-3 rounded-full ${activeTab === 'liked' ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'bg-gray-100 text-gray-500'} relative`}
            >
              <HiOutlineHeart className="w-5 h-5 sm:w-6 sm:h-6" />
              {likedProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {likedProducts.length}
                </span>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/cart')}
              className={`p-2.5 sm:p-3 rounded-full ${activeTab === 'cart' ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'bg-gray-100 text-gray-500'} relative`}
            >
              <HiOutlineShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartProducts.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  const location = useLocation();
  const [pageKey, setPageKey] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Reset state on page load/refresh
    const handleReset = () => {
      dispatch(resetState());
    };

    window.addEventListener('load', handleReset);
    return () => window.removeEventListener('load', handleReset);
  }, [dispatch]);

  useEffect(() => {
    // Force re-render when location changes
    setPageKey(prev => prev + 1);
  }, [location.pathname]);

  return (
    <div className="pb-24">
      <Routes>
        <Route path="/" element={<Discover key={pageKey} />} />
        <Route path="/passed" element={<ProductList key={`passed-${pageKey}`} filter="passed" />} />
        <Route path="/liked" element={<ProductList key={`liked-${pageKey}`} filter="liked" />} />
        <Route path="/cart" element={<ProductList key={`cart-${pageKey}`} filter="cart" />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-gradient-to-r from-pink-500 to-red-500 safe-area-top">
            <div className="max-w-lg mx-auto px-4 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Shoppin'</h1>
              </div>
            </div>
          </header>
          <main className="max-w-lg mx-auto px-4 py-4 sm:py-6">
            <MainContent />
          </main>
          <Navigation />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
