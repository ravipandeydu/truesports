const { Router } = require("express");
require("dotenv").config();
const { authentication } = require("../middlewares/authentication");

const { BookingModel } = require("../models/Booking.model");

const bookingRoutes = Router();

bookingRoutes.get("/", authentication, async (req, res) => {
  const bookings = await BookingModel.find();
  res.send(bookings);
});

bookingRoutes.post("/create", authentication, async (req, res) => {
  const newBooking = new BookingModel(req.body);
  try {
    await newBooking.save();
    res.send(newBooking);
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

module.exports = {
  bookingRoutes,
};
