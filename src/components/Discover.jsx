import { useSelector, useDispatch } from 'react-redux';
import { likeProduct, passProduct, addToCart } from '../store/productSlice';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineHeart, HiOutlineShoppingCart, HiOutlineX, HiOutlineRefresh } from 'react-icons/hi';

const ActionButton = ({ icon: Icon, onClick, color, size = "large" }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.85 }}
    className={`
      rounded-full flex items-center justify-center border-4 
      ${size === "large" 
        ? "w-16 h-16 text-2xl" 
        : "w-12 h-12 text-xl"} 
      ${color} hover:shadow-lg transition-shadow
    `}
  >
    <Icon />
  </motion.button>
);

const Discover = () => {
  const dispatch = useDispatch();
  const { products, currentIndex } = useSelector((state) => state.products);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      dispatch(likeProduct());
    } else if (direction === 'left') {
      dispatch(passProduct());
    } else if (direction === 'up') {
      dispatch(addToCart());
    }
  };

  if (currentIndex >= products.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-[70vh]"
      >
        <div className="w-24 h-24 mb-6 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">You're all caught up!</h2>
        <p className="text-gray-500 text-center mb-8">Check out your liked items or come back later for more products</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium"
          onClick={() => window.location.reload()}
        >
          <div className="flex items-center gap-2">
            <HiOutlineRefresh className="w-5 h-5" />
            <span>Refresh Products</span>
          </div>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-[80vh] flex flex-col">
      <div className="flex-grow relative">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full absolute"
          >
            <ProductCard 
              product={products[currentIndex]}
              onSwipe={handleSwipe}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tinder-style Action Buttons */}
      <div className="fixed bottom-20 left-0 right-0">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <ActionButton
              icon={HiOutlineX}
              onClick={() => handleSwipe('left')}
              color="border-red-500 text-red-500 bg-white"
            />
            <ActionButton
              icon={HiOutlineShoppingCart}
              onClick={() => handleSwipe('up')}
              color="border-blue-500 text-blue-500 bg-white"
              size="small"
            />
            <ActionButton
              icon={HiOutlineHeart}
              onClick={() => handleSwipe('right')}
              color="border-green-500 text-green-500 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
