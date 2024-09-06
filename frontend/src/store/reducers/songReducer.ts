import { GET_STATISTICS } from "../../types/redux.type";
import {
  FETCH_SONGS,
  SET_SONGS,
  ADD_SONG,
  UPDATE_SONG,
  DELETE_SONG,
  SongState,
  GET_STATS,
  SET_STATS,
  SET_SONG_STATS,
} from "../types/songTypes";

const initialState: SongState = {
  songs: [],
};

export const songReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_SONGS:
      return {
        ...state,
      };

    case SET_SONGS:
      return {
        ...state,
        songs: action.payload,
      };
    case SET_SONG_STATS:
      return {
        ...state,
        stats: action.payload, // Assuming you're storing stats separately
      };

    case SET_STATS:
      return {
        ...state,
        songs: action.payload,
      };

    case ADD_SONG:
      return {
        ...state,
        songs: [...state.songs, action.payload],
      };

    case UPDATE_SONG:
      return {
        ...state,
        songs: state.songs.map((song) =>
          song.id === action.payload.id ? action.payload.song : song
        ),
      };

    case DELETE_SONG:
      return {
        ...state,
        songs: state.songs.filter((song) => song.id !== action.payload),
      };

    default:
      return state;
  }
};
