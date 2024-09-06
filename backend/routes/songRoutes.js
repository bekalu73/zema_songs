import express from "express";
import {
  getAllSongs,
  addSong,
  updateSong,
  deleteSong,
  generateStatistics,
  toggleFavorite,
} from "../controllers/songController.js";
const router = express.Router();

// Route to get all songs
router.get("/", getAllSongs);

// Route to add a new song
router.post("/", addSong);

// Route to update an existing song by its ID
router.put("/:id", updateSong);

// Route to delete a song by its ID
router.delete("/:id", deleteSong);

// Route to generate song statistics by user ID
router.get("/stat", generateStatistics);

// Route to toggle the favorite status of a song by its ID
router.patch("/:id/toggle-favorite", toggleFavorite);

export default router;
