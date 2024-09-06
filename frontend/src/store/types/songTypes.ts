export const FETCH_SONGS = "FETCH_SONGS";
export const SET_SONGS = "SET_SONGS";
export const ADD_SONG = "ADD_SONG";
export const UPDATE_SONG = "UPDATE_SONG";
export const DELETE_SONG = "DELETE_SONG";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const GET_STATS = "GET_STATS";
export const SET_STATS = "SET_STATS";
export const SET_SONG_STATS = "SET_SONG_STATS";

// Define a Song interface
export interface Song {
  _id?: string;
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  isFavorite: boolean;
}

export interface SongState {
  songs: Song[];
}
