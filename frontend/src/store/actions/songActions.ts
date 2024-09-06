export const FETCH_SONGS = "FETCH_SONGS";
export const SET_SONGS = "SET_SONGS";
export const ADD_SONG = "ADD_SONG";
export const UPDATE_SONG = "UPDATE_SONG";
export const DELETE_SONG = "DELETE_SONG";
export const SET_SONG_STATS = "SET_SONG_STATS";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
import { GET_STATS, Song } from "../types/songTypes";

export const fetchSongs = () => ({
  type: FETCH_SONGS,
});

export const setSongs = (songs: Song[]) => ({
  type: SET_SONGS,
  payload: songs,
});

export const addSong = (song: Song) => ({
  type: ADD_SONG,
  payload: song,
});

export const updateSong = (id: string, song: Song[]) => ({
  type: UPDATE_SONG,
  payload: { id, song },
});

export const deleteSong = (id: string) => ({
  type: DELETE_SONG,
  payload: id,
});

export const setSongStats = (stats: any) => ({
  type: SET_SONG_STATS,
  payload: stats,
});
export const getStats = () => ({ type: GET_STATS });

export const toggleFavorite = (id: string) => ({
  type: TOGGLE_FAVORITE,
  payload: id,
});
