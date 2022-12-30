import axios from "axios";
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

export const getAllEvents = (token) => async (dispatch) => {
  dispatch({ type: GET_EVENTS_LOADING });
  try {
    let response = await axios.get("http://localhost:8080/event/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // let events = response.data.filter((event) => event.userId !== user._id);
    dispatch({ type: GET_EVENTS_SUCCESS, payload: response.data });
    console.log(response);
    return response.data;
  } catch (e) {
    dispatch({ type: GET_EVENTS_ERROR });
  }
};

export const getMyEvents = (token, user) => async (dispatch) => {
  dispatch({ type: GET_EVENTS_LOADING });
  try {
    let response = await axios.get("http://localhost:8080/event/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let events = response.data.filter((event) => event.userId === user._id);
    dispatch({ type: GET_EVENTS_SUCCESS, payload: events });
    console.log(response);
    return response.data;
  } catch (e) {
    dispatch({ type: GET_EVENTS_ERROR });
  }
};

export const postEvents = (token, event) => async (dispatch) => {
  dispatch({ type: POST_EVENTS_LOADING });
  try {
    await axios.post("http://localhost:8080/event/create", event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: POST_EVENTS_SUCCESS });
  } catch (e) {
    dispatch({ type: POST_EVENTS_ERROR });
  }
};

export const bookEvents = (eventId, event) => async (dispatch) => {
  dispatch({ type: PATCH_EVENTS_LOADING });
  try {
    await axios.patch(`http://localhost:8080/event/edit/${eventId}`, event, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    dispatch({ type: PATCH_EVENTS_SUCCESS });
  } catch (e) {
    dispatch({ type: PATCH_EVENTS_ERROR });
  }
};
