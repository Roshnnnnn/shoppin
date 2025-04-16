import React, { useState } from "react";
import products from "./data/products";
import "./App.css";

// Import components
import Discover from "./components/Discover";
import Liked from "./components/Liked";
import Passed from "./components/Passed";
import Cart from "./components/Cart";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState([]);
  const [passedProducts, setPassedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("discover");

  const handleSwipe = (direction, productId) => {
    const product = products.find((p) => p.id === productId);

    if (direction === "right") {
      setLikedProducts([...likedProducts, product]);
    } else if (direction === "left") {
      setPassedProducts([...passedProducts, product]);
    } else if (direction === "up") {
      setCartProducts([...cartProducts, product]);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleGestureClick = (direction) => {
    if (currentProduct) {
      handleSwipe(direction, currentProduct.id);
    }
  };

  const currentProduct = products[currentIndex];

  const renderContent = () => {
    switch (activeTab) {
      case "discover":
        return (
          <Discover
            currentProduct={currentProduct}
            handleSwipe={handleSwipe}
            handleGestureClick={handleGestureClick}
          />
        );

      case "liked":
        return (
          <Liked
            likedProducts={likedProducts}
            setCartProducts={setCartProducts}
          />
        );

      case "passed":
        return (
          <Passed
            passedProducts={passedProducts}
            setLikedProducts={setLikedProducts}
          />
        );

      case "cart":
        return <Cart cartProducts={cartProducts} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("discover")}
              className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 min-w-[120px] nav-button ${
                activeTab === "discover" ? "active-tab" : ""
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveTab("liked")}
              className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 min-w-[120px] ${
                activeTab === "liked"
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Liked ({likedProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("passed")}
              className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 min-w-[120px] ${
                activeTab === "passed"
                  ? "bg-gradient-to-r from-rose-400 to-red-500 text-white shadow-lg"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Passed ({passedProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("cart")}
              className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 min-w-[120px] ${
                activeTab === "cart"
                  ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Cart ({cartProducts.length})
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
