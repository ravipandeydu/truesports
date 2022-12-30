import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP_LOADING,
  AUTH_SIGNUP_SUCCESS,
} from "./auth.types";

let initialState = {
  loading: false,
  error: false,
  errormsg: "",
  isAuth: false,
  successmsg: "",
  user: {},
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        errormsg: payload,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        errormsg: "",
        successmsg: payload.message,
        user: payload,
      };
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: false,
        user: {},
      };
    }

    case AUTH_SIGNUP_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case AUTH_SIGNUP_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        errormsg: payload,
      };
    }
    case AUTH_SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: false,
        errormsg: "",
        successmsg: payload,
      };
    }
    default: {
      return state;
    }
  }
};
