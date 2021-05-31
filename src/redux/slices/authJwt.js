import jwtDecode from 'jwt-decode';
//import axios from 'src/utils/axios';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { ajaxUrl } from 'src/config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {}
};

const slice = createSlice({
  name: 'authJwt',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    updateProfileSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    resetPasswordSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export function login({ email, password }) {
  return async (dispatch) => {
    const response = await axios.post(`${ajaxUrl}/api/account/login`, {
      email,
      password
    });
    const { accessToken, user } = response.data;
    console.log(response);
    setSession(accessToken);
    dispatch(slice.actions.loginSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function register({ email, password, firstName, lastName }) {
  return async (dispatch) => {
    const response = await axios.post(`${ajaxUrl}/api/account/register`, {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;
    //console.log(user, accessToken);

    window.localStorage.setItem('accessToken', accessToken);
    dispatch(slice.actions.registerSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function updateProfile({
  displayName,
  photoURL,
  phoneNumber,
  country,
  state,
  city,
  address,
  zipCode,
  about,
  isPublic
}) {
  return async (dispatch) => {
    const curAccessToken = window.localStorage.getItem('accessToken');
    if (curAccessToken && isValidToken(curAccessToken)) {
      setSession(curAccessToken);
    }
    const response = await axios.post(`${ajaxUrl}/api/account/update-profile`, {
      displayName,
      photoURL,
      phoneNumber,
      country,
      state,
      city,
      address,
      zipCode,
      about,
      isPublic
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch(slice.actions.updateProfileSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function resetPassword(email) {
  return async (dispatch) => {
    const response = await axios.post(`${ajaxUrl}/api/account/reset-password`, {
      email
    });
    // const { accessToken, user } = response.data;

    // window.localStorage.setItem('accessToken', accessToken);
    // dispatch(slice.actions.resetPasswordSuccess({ user }));
  };
}

export function updatePassword(token, password) {
  return async (dispatch) => {
    const response = await axios.post(
      `${ajaxUrl}/api/account/update-password`,
      { token: token, password: password }
    );
    // const { accessToken, user } = response.data;

    // window.localStorage.setItem('accessToken', accessToken);
    // dispatch(slice.actions.resetPasswordSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function logout() {
  return async (dispatch) => {
    setSession(null);
    dispatch(slice.actions.logoutSuccess());
  };
}

// ----------------------------------------------------------------------

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get(`${ajaxUrl}/api/account/my-account`);
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: response.data.user
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
