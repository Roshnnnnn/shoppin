import { createSlice } from '@reduxjs/toolkit';
import { products } from '../data/products';

const initialState = {
  products,
  currentIndex: 0,
  likedProducts: [],
  passedProducts: [],
  cartProducts: []
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetState: () => initialState,
    likeProduct: (state) => {
      const currentProduct = state.products[state.currentIndex];
      if (currentProduct && !state.likedProducts.find(p => p.id === currentProduct.id)) {
        state.likedProducts.push(currentProduct);
        state.currentIndex += 1;
      }
    },
    passProduct: (state) => {
      const currentProduct = state.products[state.currentIndex];
      if (currentProduct && !state.passedProducts.find(p => p.id === currentProduct.id)) {
        state.passedProducts.push(currentProduct);
        state.currentIndex += 1;
      }
    },
    addToCart: (state) => {
      const currentProduct = state.products[state.currentIndex];
      if (currentProduct && !state.cartProducts.find(p => p.id === currentProduct.id)) {
        state.cartProducts.push(currentProduct);
        state.currentIndex += 1;
      }
    },
    moveToLiked: (state, action) => {
      const { productId, fromList } = action.payload;
      let product = null;

      // Find the source list and product
      if (fromList === 'passed') {
        const index = state.passedProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
          product = state.passedProducts[index];
          state.passedProducts.splice(index, 1);
        }
      } else if (fromList === 'cart') {
        const index = state.cartProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
          product = state.cartProducts[index];
          state.cartProducts.splice(index, 1);
        }
      } else if (fromList === 'discover') {
        const index = state.currentIndex;
        if (index < state.products.length) {
          product = state.products[index];
          state.currentIndex += 1;
        }
      }

      // Add to liked list if not already there
      if (product && !state.likedProducts.find(p => p.id === product.id)) {
        state.likedProducts.push(product);
      }
    },
    moveToCart: (state, action) => {
      const { productId, fromList } = action.payload;
      let product = null;

      // Find the source list and product
      if (fromList === 'liked') {
        const index = state.likedProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
          product = state.likedProducts[index];
          state.likedProducts.splice(index, 1);
        }
      } else if (fromList === 'passed') {
        const index = state.passedProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
          product = state.passedProducts[index];
          state.passedProducts.splice(index, 1);
        }
      } else if (fromList === 'discover') {
        const index = state.currentIndex;
        if (index < state.products.length) {
          product = state.products[index];
          state.currentIndex += 1;
        }
      }

      // Add to cart if not already there
      if (product && !state.cartProducts.find(p => p.id === product.id)) {
        state.cartProducts.push(product);
      }
    },
    moveToPassed: (state, action) => {
      const { productId, fromList } = action.payload;
      let product = null;

      // Find the source list and product
      if (fromList === 'liked') {
        const index = state.likedProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
          product = state.likedProducts[index];
          state.likedProducts.splice(index, 1);
        }
      } else if (fromList === 'cart') {
        const index = state.cartProducts.findIndex(p => p.id === productId);
        if (index !== -1) {
          product = state.cartProducts[index];
          state.cartProducts.splice(index, 1);
        }
      } else if (fromList === 'discover') {
        const index = state.currentIndex;
        if (index < state.products.length) {
          product = state.products[index];
          state.currentIndex += 1;
        }
      }

      // Add to passed list if not already there
      if (product && !state.passedProducts.find(p => p.id === product.id)) {
        state.passedProducts.push(product);
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const index = state.cartProducts.findIndex(p => p.id === productId);
      if (index !== -1) {
        state.cartProducts.splice(index, 1);
      }
    }
  }
});

export const { 
  resetState,
  likeProduct, 
  passProduct, 
  addToCart,
  moveToLiked,
  moveToCart,
  moveToPassed,
  removeFromCart
} = productSlice.actions;

export default productSlice.reducer;
