import axios from "axios";
import { Song, SongStatistics } from "../types/data.type";

axios.defaults.baseURL = "http://localhost:5000/api";

// Song APIs
export const getSongsAPI = async () => await axios.get<Song[]>(`/songs`);
export const getStatisticsAPI = async () =>
  await axios.get<SongStatistics>(`/songs/stats`);
export const addSongAPI = async (song: Song) =>
  await axios.post<Song>("/songs", song);
export const deleteSongAPI = async (id: string) =>
  await axios.delete(`/songs/${id}`);
export const updateSongAPI = async (song: Song) =>
  await axios.put<Song>(`/songs/${song._id}`, song);

// Note: The toggleFavorite API needs to be defined on the server-side to make this request work.
export const toggleFavoriteAPI = async (id: string) =>
  await axios.patch(`/songs/${id}/toggle-favorite`);
