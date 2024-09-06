import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  createdBy: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  isFavorite: { type: Boolean, requered: true, default: false },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
