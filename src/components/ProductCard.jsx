import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { HiOutlineHeart, HiOutlineShoppingCart, HiOutlineX } from 'react-icons/hi';

const ProductCard = ({ product, onSwipe }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Calculate rotation based on drag
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  
  // Calculate opacity for the action indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, 0], [1, 0]);
  const cartOpacity = useTransform(y, [-100, 0], [1, 0]);

  const handleDragEnd = async (event, info) => {
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;
    const xVelocity = info.velocity.x;
    const yVelocity = info.velocity.y;

    if (Math.abs(yOffset) > 100 && yOffset < 0) {
      await controls.start({
        y: -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe('up');
    } else if (Math.abs(xOffset) > 100 || Math.abs(xVelocity) > 500) {
      const direction = xOffset > 0 ? 'right' : 'left';
      await controls.start({
        x: direction === 'right' ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      });
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[calc(100vh-16rem)] sm:h-[600px]">
      {/* Action Indicators */}
      <motion.div 
        className="absolute top-4 sm:top-6 left-4 sm:left-6 transform -rotate-12 z-30"
        style={{ opacity: likeOpacity }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 bg-green-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl border-4 border-white shadow-xl">
          <HiOutlineHeart className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-bold">LIKE</span>
        </div>
      </motion.div>
      <motion.div 
        className="absolute top-4 sm:top-6 right-4 sm:right-6 transform rotate-12 z-30"
        style={{ opacity: passOpacity }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 bg-red-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl border-4 border-white shadow-xl">
          <HiOutlineX className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-bold">NOPE</span>
        </div>
      </motion.div>
      <motion.div 
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-30"
        style={{ opacity: cartOpacity }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl border-4 border-white shadow-xl">
          <HiOutlineShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-bold">CART</span>
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, y, rotate }}
        whileTap={{ cursor: "grabbing" }}
        className="absolute w-full bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab touch-none h-full"
      >
        <div className="relative h-full">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold capitalize mb-1 sm:mb-2">{product.name}</h2>
                <p className="text-lg sm:text-xl text-white/90 mb-2 sm:mb-3">{product.brand}</p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl font-bold">₹{product.price}</span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-xl sm:text-2xl text-white/70 line-through">₹{product.originalPrice}</span>
                      <span className="bg-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-base sm:text-lg font-medium">
                        {product.discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Drag Indicators */}
          {/* <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: x.get() === 0 ? 0.7 : 0 }}
          >
            <div className="text-white/50 text-base sm:text-lg font-medium">
              Drag to Like or Pass
            </div>
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
