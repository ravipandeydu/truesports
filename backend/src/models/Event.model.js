const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, require: true },
    desc: { type: String, require: true },
    img: { type: String, require: true },
    gameType: { type: String, require: true },
    startAt: { type: Date, require: true },
    endAt: { type: Date, require: true },
    playersLimit: { type: Number, require: true },
    players: { type: Array, require: true, default: [] },
    pending: { type: Array, require: true, default: [] },
    rejected: { type: Array, require: true, default: [] },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("event", eventSchema);

module.exports = {
  EventModel,
};
