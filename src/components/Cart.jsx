import React from "react";

const Cart = ({ cartProducts }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Shopping Cart</h2>
        <div className="space-y-6">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-6 items-center bg-gray-50/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg capitalize text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 capitalize">{product.brand}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
                {product.discountPercentage > 0 && (
                  <p className="text-sm text-green-600">
                    {product.discountPercentage}% OFF
                  </p>
                )}
              </div>
            </div>
          ))}
          {cartProducts.length > 0 && (
            <div className="mt-8 text-right border-t pt-6">
              <p className="text-lg text-gray-900 mb-4">
                Total:{" "}
                <span className="text-2xl font-bold ml-2">
                  ₹{cartProducts.reduce((sum, p) => sum + p.price, 0)}
                </span>
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105 text-lg font-semibold">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
