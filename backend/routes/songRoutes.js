const express = require("express");
const songController = require("../controllers/songController");
const Song = require("../models/Song");

const router = express.Router();

// Route to get song statistics
router.get("/songs/stats", songController.getSongStats);

// Route to create a new song
router.post("/songs", songController.createSong);

// Route to get all songs
router.get("/songs", songController.getAllSongs);

// Route to get a single song by ID
router.get("/songs/:id", songController.getSongById);

// Route to update a song
router.put("/songs/:id", songController.updateSong);

// Route to delete a song
router.delete("/songs/:id", songController.deleteSong);
// Toggle favorite status
router.patch("/songs/:id/toggle-favorite", async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Toggle the isFavorite field
    song.isFavorite = !song.isFavorite;
    await song.save();

    return res.status(200).json({ message: "Favorite status updated", song });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
