const Song = require("../models/Song");

// Service to create a new song
const createSong = async (songData) => {
  const song = new Song(songData);
  return await song.save();
};

// Service to get all songs
const getAllSongs = async () => {
  return await Song.find();
};

// Service to get a single song by ID
const getSongById = async (id) => {
  return await Song.findById(id);
};

// Service to update a song
const updateSong = async (id, updateData) => {
  return await Song.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// Service to delete a song
const deleteSong = async (id) => {
  return await Song.findByIdAndDelete(id);
};

// Service to get statistics
const getSongStats = async () => {
  const totalSongs = await Song.countDocuments();
  const totalArtists = await Song.distinct("artist").countDocuments();
  const totalAlbums = await Song.distinct("album").countDocuments();
  const totalGenres = await Song.distinct("genre").countDocuments();

  const genreCounts = await Song.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } },
  ]);

  const artistStats = await Song.aggregate([
    {
      $group: {
        _id: "$artist",
        songs: { $sum: 1 },
        albums: { $addToSet: "$album" },
      },
    },
  ]);

  return {
    totalSongs,
    totalArtists,
    totalAlbums,
    totalGenres,
    genreCounts,
    artistStats,
  };
};

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongStats,
};
