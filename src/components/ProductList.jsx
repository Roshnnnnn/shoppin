import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, moveToLiked, moveToCart, moveToPassed } from '../store/productSlice';
import { HiOutlineHeart, HiOutlineShoppingCart, HiOutlineX } from 'react-icons/hi';
import { useState, useEffect } from 'react';

const ProductList = ({ filter }) => {
  const dispatch = useDispatch();
  const [animatingCards, setAnimatingCards] = useState({});
  const [removedItems, setRemovedItems] = useState(new Set());
  
  const { likedProducts, passedProducts, cartProducts } = useSelector((state) => state.products);
  
  let products = [];
  let emptyMessage = '';
  
  switch (filter) {
    case 'liked':
      products = likedProducts;
      emptyMessage = 'No liked products yet';
      break;
    case 'passed':
      products = passedProducts;
      emptyMessage = 'No passed products';
      break;
    case 'cart':
      products = cartProducts;
      emptyMessage = 'Your cart is empty';
      break;
    default:
      products = [];
      emptyMessage = 'No products';
  }

  // Reset removed items when filter changes
  useEffect(() => {
    setRemovedItems(new Set());
  }, [filter]);

  const totalPrice = products ? products.reduce((sum, product) => sum + product.price, 0) : 0;

  const handleAction = async (action, productId, direction) => {
    // Mark item as being removed
    setRemovedItems(prev => new Set([...prev, productId]));
    
    setAnimatingCards(prev => ({
      ...prev,
      [productId]: {
        x: direction === 'right' ? 1000 : direction === 'left' ? -1000 : 0,
        y: direction === 'up' ? -1000 : 0,
        opacity: 0
      }
    }));

    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Get the current list before dispatching the action
    const fromList = filter;
    
    // Dispatch the correct action with fromList
    if (action === 'like') {
      dispatch(moveToLiked({ productId, fromList }));
    } else if (action === 'cart') {
      dispatch(moveToCart({ productId, fromList }));
    } else if (action === 'pass') {
      dispatch(moveToPassed({ productId, fromList }));
    } else if (action === 'remove') {
      dispatch(removeFromCart(productId));
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-16rem)]">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mb-4 sm:mb-6 text-2xl sm:text-3xl"
        >
          {filter === 'liked' ? '❤️' : filter === 'passed' ? '✖️' : filter === 'cart' ? '🛒' : '📦'}
        </motion.div>
        <p className="text-gray-500 text-center font-medium text-sm sm:text-base">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Cart Total */}
      {filter === 'cart' && products.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 bg-white shadow-lg rounded-xl mb-4 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium text-sm sm:text-base">Cart Total</h3>
                <p className="text-2xl sm:text-3xl font-bold text-white">₹{totalPrice.toLocaleString()}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-500 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium shadow-lg"
              >
                Checkout
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <AnimatePresence>
          {products.filter(product => !removedItems.has(product.id)).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={animatingCards[product.id] || { opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-bold text-white capitalize">{product.name}</h3>
                  <p className="text-sm sm:text-base text-white/80">{product.brand}</p>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-white">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">₹{product.price}</span>
                      {product.discountPercentage > 0 && (
                        <>
                          <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          <span className="text-xs sm:text-sm font-medium text-green-500">-{product.discountPercentage}%</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {filter !== 'liked' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction('like', product.id, 'right')}
                        className="flex-1 flex items-center justify-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs sm:text-sm font-medium rounded-lg"
                      >
                        <HiOutlineHeart className="w-4 h-4" />
                        Like
                      </motion.button>
                    )}
                    
                    {filter !== 'cart' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction('cart', product.id, 'up')}
                        className="flex-1 flex items-center justify-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded-lg"
                      >
                        <HiOutlineShoppingCart className="w-4 h-4" />
                        Cart
                      </motion.button>
                    )}
                    
                    {filter === 'cart' ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction('remove', product.id, 'up')}
                        className="flex-1 flex items-center justify-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white text-xs sm:text-sm font-medium rounded-lg"
                      >
                        <HiOutlineX className="w-4 h-4" />
                        Remove
                      </motion.button>
                    ) : filter !== 'passed' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction('pass', product.id, 'left')}
                        className="flex-1 flex items-center justify-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-500 text-white text-xs sm:text-sm font-medium rounded-lg"
                      >
                        <HiOutlineX className="w-4 h-4" />
                        Pass
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductList;
