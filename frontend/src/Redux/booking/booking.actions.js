import axios from "axios";
import {
  GET_BOOKING_ERROR,
  GET_BOOKING_LOADING,
  GET_BOOKING_SUCCESS,
  POST_BOOKING_ERROR,
  POST_BOOKING_LOADING,
  POST_BOOKING_SUCCESS,
} from "./booking.types";

export const getBookings = (token, user) => async (dispatch) => {
  dispatch({ type: GET_BOOKING_LOADING });
  try {
    let response = await axios.get("http://localhost:8080/booking/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let bookings = response.data.filter(
      (booking) => booking.userId === user._id
    );
    dispatch({ type: GET_BOOKING_SUCCESS, payload: bookings });
    console.log(response);
    return response.data;
  } catch (e) {
    dispatch({ type: GET_BOOKING_ERROR });
  }
};

export const postBookings = (token, booking) => async (dispatch) => {
  dispatch({ type: POST_BOOKING_LOADING });
  try {
    await axios.post("http://localhost:8080/booking/create", booking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: POST_BOOKING_SUCCESS });
  } catch (e) {
    dispatch({ type: POST_BOOKING_ERROR });
  }
};
