import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const Discover = ({ currentProduct, handleSwipe, handleGestureClick }) => {
  return (
    <>
      <div className="flex justify-center items-center min-h-[500px]">
        {currentProduct ? (
          <ProductCard
            key={currentProduct.id}
            product={currentProduct}
            onSwipe={handleSwipe}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 glass-bg rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              No more products to show
            </h2>
            <p className="text-gray-900">Check out your liked items or cart!</p>
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex gap-8 items-center justify-center text-sm">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => handleGestureClick("left")}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg transform transition-all hover:scale-110 hover:shadow-xl cursor-pointer"
          >
            👈
          </motion.button>
          <span className="font-medium text-gray-900">Pass</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => handleGestureClick("up")}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg transform transition-all hover:scale-110 hover:shadow-xl cursor-pointer"
          >
            👆
          </motion.button>
          <span className="font-medium text-gray-900">Cart</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => handleGestureClick("right")}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg transform transition-all hover:scale-110 hover:shadow-xl cursor-pointer"
          >
            👉
          </motion.button>
          <span className="font-medium text-gray-900">Like</span>
        </div>
      </div>
    </>
  );
};

export default Discover;
