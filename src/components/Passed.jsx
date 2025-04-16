import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Passed = ({ passedProducts, setLikedProducts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <AnimatePresence>
        {passedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="font-bold text-lg capitalize text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600 capitalize mt-1">{product.brand}</p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
                <button
                  onClick={() => setLikedProducts(prev => [...prev, product])}
                  className="px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Move to Liked
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Passed;
