import {
  GET_EVENTS_ERROR,
  GET_EVENTS_LOADING,
  GET_EVENTS_SUCCESS,
  PATCH_EVENTS_ERROR,
  PATCH_EVENTS_LOADING,
  PATCH_EVENTS_SUCCESS,
  POST_EVENTS_ERROR,
  POST_EVENTS_LOADING,
  POST_EVENTS_SUCCESS,
} from "./events.types";

let initialState = {
  loading: false,
  error: false,
  data: [],
};

export const eventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_EVENTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_EVENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_EVENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }
    case POST_EVENTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_EVENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case POST_EVENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false
      };
    }

    case PATCH_EVENTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case PATCH_EVENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case PATCH_EVENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false
      };
    }
    default: {
      return state;
    }
  }
};
