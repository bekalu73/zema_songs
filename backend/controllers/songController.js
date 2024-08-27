const songService = require("../services/songService");

// Controller to handle creating a new song
const createSong = async (req, res) => {
  try {
    const song = await songService.createSong(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to handle fetching all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle fetching a single song by ID
const getSongById = async (req, res) => {
  try {
    const song = await songService.getSongById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle updating a song
const updateSong = async (req, res) => {
  try {
    const song = await songService.updateSong(req.params.id, req.body);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to handle deleting a song
const deleteSong = async (req, res) => {
  try {
    const song = await songService.deleteSong(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle fetching song statistics
const getSongStats = async (req, res) => {
  try {
    const stats = await songService.getSongStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongStats,
};
