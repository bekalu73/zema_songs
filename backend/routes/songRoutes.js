const express = require("express");
const songController = require("../controllers/songController");

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

module.exports = router;
