import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Passed = ({ passedProducts, setLikedProducts }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Passed Items
      </h2>
      {/* Changed grid-cols-3 to grid-cols-2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <AnimatePresence>
          {passedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium uppercase tracking-wider mb-2">
                    {product.brand}
                  </p>
                  <h3 className="text-xl font-bold capitalize">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{product.price}
                      </p>
                      {product.discountPercentage > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </p>
                          <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                            {product.discountPercentage}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLikedProducts(prev => [...prev, product])}
                      className="px-6 py-3 bg-gradient-to-r from-rose-400 to-red-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <span>Move to Liked</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {passedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center p-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Passed Items
            </h3>
            <p className="text-gray-600">
              Items you pass will appear here. Start discovering products!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Passed;
