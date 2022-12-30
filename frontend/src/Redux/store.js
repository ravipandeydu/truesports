import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { authReducer } from "./auth/auth.reducer";
import thunk from "redux-thunk";
import { eventsReducer } from "./events/events.reducer";
import { bookingsReducer } from "./booking/booking.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  bookings: bookingsReducer,
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);

export { store };
