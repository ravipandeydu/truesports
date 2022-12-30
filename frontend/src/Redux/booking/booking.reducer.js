import {
  GET_BOOKING_ERROR,
  GET_BOOKING_LOADING,
  GET_BOOKING_SUCCESS,
  POST_BOOKING_ERROR,
  POST_BOOKING_LOADING,
  POST_BOOKING_SUCCESS,
} from "./booking.types";

let initialState = {
  loading: false,
  error: false,
  data: [],
};

export const bookingsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BOOKING_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_BOOKING_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_BOOKING_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }
    case POST_BOOKING_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_BOOKING_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case POST_BOOKING_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
};
