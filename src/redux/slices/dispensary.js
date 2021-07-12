/* eslint-disable */
import { sum, map, filter, uniqBy } from 'lodash';
import { axios, setSession, isValidToken } from 'src/utils/my.axios';
import { createSlice } from '@reduxjs/toolkit';
import { ajaxUrl } from 'src/config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  dispensaries: [],
  favoriteDispensaries: [],
  dispensary: null,
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
  name: 'dispensary',
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

    setDispensary(state, action) {
      state.isLoading = false;
      state.dispensary = action.payload;
    },

    // GET PRODUCTS
    getDispensariesSuccess(state, action) {
      state.isLoading = false;
      state.dispensaries = action.payload;
    },

    getFavoriteDispensariesSuccess(state, action) {
      state.isLoading = false;
      state.favoriteDispensaries = action.payload;
    },

    getDispensarySuccess(state, action) {
      state.isLoading = false;
      state.dispensary = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByDispensaries(state, action) {
      state.sortBy = action.payload;
    },

    filterDispensaries(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
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
  sortByDispensaries,
  filterDispensaries,
  setDispensary,
} = slice.actions;

// ----------------------------------------------------------------------

export function getDispensaries() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(`${ajaxUrl}/api/dispensary/all`);
        dispatch(slice.actions.getDispensariesSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getDispensary(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(`${ajaxUrl}/api/dispensary/by-id/${id}`);
        dispatch(slice.actions.getDispensarySuccess(response.data));
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getFavoriteDispensaries() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.get(
          `${ajaxUrl}/api/dispensary/favorite-dispensaries`
        );
        dispatch(slice.actions.getFavoriteDispensariesSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function toggleFavoriteDispensary(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const curAccessToken = window.localStorage.getItem('accessToken');
      if (curAccessToken && isValidToken(curAccessToken)) {
        setSession(curAccessToken);
        const response = await axios.post(
          `${ajaxUrl}/api/dispensary/favorite-dispensaries`,
          { dispensaryId: id }
        );
        dispatch(slice.actions.getFavoriteDispensariesSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
