import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import AllEvents from "./Pages/AllEvents";
import MyEvents from "./Pages/MyEvents";
import MyBookedEvents from "./Pages/MyBookedEvents";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AllEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/booked"
          element={
            <PrivateRoute>
              <MyBookedEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/myevents"
          element={
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
