const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authentication } = require("../middlewares/authentication");

const { EventModel } = require("../models/Event.model");

const eventRoutes = Router();

eventRoutes.get("/", authentication, async (req, res) => {
  const events = await EventModel.find();
  res.send(events);
});

eventRoutes.post("/create", authentication, async (req, res) => {
  const newEvent = new EventModel(req.body);
  try {
    await newEvent.save();
    res.send(newEvent);
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

eventRoutes.delete("/delete/:eventId", authentication, async (req, res) => {
  const { eventId } = req.params;
  const deletedEvent = await EventModel.findOneAndDelete({
    _id: eventId,
  });
  if (deletedEvent) {
    res.status(200).send("Deleted");
  } else {
    res.send("couldn't delete");
    console.log(err);
  }
});

eventRoutes.patch("/edit/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const updatedEvent = await EventModel.findOneAndUpdate(
    { _id: eventId },
    req.body
  );
  if (updatedEvent) {
    res.send(updatedEvent);
  } else {
    res.send("couldn't update");
  }
});

module.exports = {
  eventRoutes,
};
