import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const ProductCard = ({ product, onSwipe }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleDragEnd = (event, info) => {
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;

    if (Math.abs(xOffset) > 100) {
      if (xOffset > 0) {
        onSwipe("right", product.id);
      } else {
        onSwipe("left", product.id);
      }
    } else if (yOffset < -100) {
      onSwipe("up", product.id);
    }
  };

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.05 }}
      className="absolute w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
          <h2 className="text-2xl font-bold text-white capitalize">
            {product.name}
          </h2>
          <p className="text-white/90 capitalize">{product.brand}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </p>
                <span className="text-sm text-green-600 font-medium">
                  {product.discountPercentage}% OFF
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
