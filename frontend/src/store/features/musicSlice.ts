import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Song, SongStatistics } from "../../types/data.type";
import { SongsState } from "../../types/data.type";

const initialState: SongsState = {
  userData: { userName: "bekalu" },
  songs: [],
  currentSong: [],
  recentSongs: [],
  currentBody: "home",
  songFiltered: false,
  openSidebar: false,
  addSong: false,
  currentPlaying: null,
  updateSong: false,
  songStatistics: undefined,
  dataTobeUpdated: {},
  searchCars: "",
  isLoading: false,
};

// Async thunk to fetch song statistics from the API
export const fetchSongStatistics = createAsyncThunk(
  "music/fetchSongStatistics",
  async () => {
    const response = await axios.get("/songs/stats");
    return response.data;
  }
);
const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    loadAllSongs(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.currentSong = action.payload;
    },
    loadStatistics(state, action: PayloadAction<SongStatistics>) {
      state.songStatistics = action.payload;
    },
    setCurrentBody(state, action: PayloadAction<string>) {
      state.currentSong = state.songs;
      state.currentBody = action.payload;
    },
    openAddSong(state, action: PayloadAction<boolean>) {
      state.addSong = action.payload;
    },
    openUpdateSong(state, action: PayloadAction<boolean>) {
      state.updateSong = action.payload;
    },
    filterCurrentSongs(state, action: PayloadAction<Partial<Song>>) {
      const filters = action.payload;
      state.currentSong = state.songs.filter((item) => {
        return Object.keys(filters).every((key) => {
          if (key === "isFavorite") {
            return filters[key as keyof Song] ? item[key] : true;
          } else {
            return item[key as keyof Song] === filters[key as keyof Song];
          }
        });
      });
    },
    updateSong(state, action: PayloadAction<Partial<Song>>) {
      const updatedSong = action.payload;
      state.currentSong = state.currentSong.map((song) => {
        if (song._id === updatedSong._id) {
          return { ...song, ...updatedSong };
        } else {
          return song;
        }
      });
    },
    addSong(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      state.currentSong.push(action.payload);
    },
    deleteSong(state, action: PayloadAction<string | undefined>) {
      const deletedId = action.payload;
      state.currentSong = state.currentSong.filter((item) => {
        return item._id !== deletedId;
      });
    },
    loadUpdateData(state, action: PayloadAction<Song>) {
      state.dataTobeUpdated = action.payload;
    },
    toggleFilteredSong(state, action: PayloadAction<boolean>) {
      state.songFiltered = action.payload;
    },
    setCurrentSong(state, action: PayloadAction<Song>) {
      state.currentPlaying = action.payload;
    },
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.openSidebar = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const songs = state.currentSong;
      const songIndex = songs.findIndex((song) => song._id === id);

      if (songIndex !== -1) {
        state.currentSong[songIndex].isFavorite = !songs[songIndex].isFavorite;
      }
    },
    filterSongsBySearch(state, action: PayloadAction<string>) {
      const songs = state.songs;
      const searchChars = action.payload.toLowerCase();
      state.currentSong = songs.filter((song) => {
        return (
          song.title.toLowerCase().includes(searchChars) ||
          song.artist.toLowerCase().includes(searchChars)
        );
      });
    },
    LoadingState(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    addRecentSongs(state, action: PayloadAction<Song>) {
      const song = action.payload;
      const recentSongs = state.recentSongs;
      const existingIndex = recentSongs.findIndex(
        (music) => music._id === song._id
      );

      if (existingIndex !== -1) {
        state.recentSongs.splice(existingIndex, 1);
      }

      state.recentSongs.unshift(song);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSongStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.songStatistics = action.payload;
      })
      .addCase(fetchSongStatistics.rejected, (state, action) => {
        state.isLoading = false;
        action.error.message || "Failed to fetch song statistics";
      });
  },
});

export const {
  filterCurrentSongs,
  filterSongsBySearch,
  loadAllSongs,
  setCurrentBody,
  openAddSong,
  openUpdateSong,
  loadStatistics,
  updateSong,
  addSong,
  deleteSong,
  toggleFilteredSong,
  loadUpdateData,
  setCurrentSong,
  toggleSidebar,
  toggleFavorite,
  LoadingState,
  addRecentSongs,
} = songsSlice.actions;

export default songsSlice.reducer;
