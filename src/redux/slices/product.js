/* eslint-disable */
import { sum, map, filter, uniqBy } from 'lodash';
import { axios, setSession, isValidToken } from 'src/utils/my.axios';
import { createSlice } from '@reduxjs/toolkit';
import { ajaxUrl } from 'src/config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  products: [],
  favoriteProducts: [],
  product: null,
  categories: [],
  category: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: ''
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null
  }
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    getFavoriteProductsSuccess(state, action) {
      state.isLoading = false;
      state.favoriteProducts = action.payload;
    },

    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },

    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.category = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(
        cart.map((product) => product.price * product.quantity)
      );
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = filter(state.checkout.cart, (item) => {
        return item.id !== action.payload;
      });

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total =
        state.checkout.subtotal - state.checkout.discount + shipping;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  filterProducts
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(`${ajaxUrl}/api/product/`);
        dispatch(slice.actions.getProductsSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProductsByCategory(categoryId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(`${ajaxUrl}/api/product/by-category/${categoryId}`);
        dispatch(slice.actions.getProductsSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCategory(categoryId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(`${ajaxUrl}/api/product/category/${categoryId}`);
        dispatch(slice.actions.getCategorySuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(`${ajaxUrl}/api/product/by-id/${id}`);
        dispatch(slice.actions.getProductSuccess(response.data));
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCategories() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(`${ajaxUrl}/api/product/category/all`);
        dispatch(slice.actions.getCategoriesSuccess(response.data));
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getFavoriteProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(
          `${ajaxUrl}/api/product/favorite-products`
        );
        dispatch(slice.actions.getFavoriteProductsSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function toggleFavoriteProduct(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.post(
          `${ajaxUrl}/api/product/favorite-products`,
          { productId: id }
        );
        dispatch(slice.actions.getFavoriteProductsSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
