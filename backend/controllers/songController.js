import Song from "../models/Song.js";

// get all songs
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    if (!songs) return res.status(404).json({ message: "Song not found" });
    return res.status(200).json({ songs: songs });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addSong = async (req, res) => {
  try {
    const { title, artist, album, genre, createdBy } = req.body;

    if (!title || !artist || !album || !genre || !createdBy) {
      return res.status(400).json({
        message:
          "All fields (title, artist, album, genre, createdBy) are required",
      });
    }

    const newSong = new Song({ title, artist, album, genre, createdBy });

    const savedSong = await newSong.save();

    return res.status(201).json({
      message: "Song added successfully",
      song: savedSong,
    });
  } catch (error) {
    return console.error("Error adding song:", error.message);
  }
};
export const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, album, genre, createdBy } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Song ID is required" });
    }
    // Check if the required fields for update are provided
    if (!title && !artist && !album && !genre && !createdBy) {
      return res.status(400).json({
        message:
          "At least one field (title, artist, album, genre) must be provided to update",
      });
    }
    // Find the song by ID and update it, returning the updated song
    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { title, artist, album, genre, createdBy },
      { new: true, runValidators: true }
    );
    // Check if the song was found and updated
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Successfully updated song
    return res
      .status(200)
      .json({ message: "Song updated successfully", song: updatedSong });
  } catch (error) {
    return console.error("Error updating song:", error.message);
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for song ID
    if (!id) {
      return res.status(400).json({ message: "Song ID is required" });
    }

    // Find and delete the song
    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const generateStatistics = async (req, res) => {
  try {
    const match = {};

    const totalSongs = await Song.countDocuments(match);
    const totalArtists = (await Song.distinct("artist", match)).length;
    const totalAlbums = (await Song.distinct("album", match)).length;
    const totalGenres = (await Song.distinct("genre", match)).length;

    const genreCounts = await Song.aggregate([
      { $match: match },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);
    const artistAlbumCounts = await Song.aggregate([
      { $match: match },
      {
        $group: {
          _id: { artist: "$artist", album: "$album" },
          count: { $sum: 1 },
        },
      },
    ]);
    const albumSongCounts = await Song.aggregate([
      { $match: match },
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);

    const genreSongCounts = await Song.aggregate([
      { $match: match },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const artistSongCounts = await Song.aggregate([
      { $match: match },
      { $group: { _id: "$artist", count: { $sum: 1 } } },
    ]);

    // Additional statistics
    const favoriteSongsCount = await Song.countDocuments({
      ...match,
      isFavorite: true,
    });
    return res.status(200).json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreCounts,
      artistAlbumCounts,
      albumSongCounts,
      genreSongCounts,
      artistSongCounts,
      favoriteSongsCount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const songId = req.params.id;

    // Find the song by ID
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Toggle the favorite status
    song.isFavorite = !song.isFavorite;
    await song.save();

    // Respond with the updated favorite status
    return res.status(200).json({
      message: "Favorite status toggled successfully",
      isFavorite: song.isFavorite,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
