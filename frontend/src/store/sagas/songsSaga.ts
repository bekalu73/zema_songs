import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_SONGS,
  ADD_SONG,
  UPDATE_SONG,
  DELETE_SONG,
  TOGGLE_FAVORITE,
  GET_STATS,
  SET_SONGS,
  SET_STATS,
} from "../types/songTypes";
import { Song } from "../types/songTypes";
import { setSongs, setSongStats } from "../actions/songActions";

// API URLs
const songEnv = "http://localhost:8800";

// Function to fetch songs from the API
const fetchSongsFromAPI = async (): Promise<Song[]> => {
  const response = await axios.get(`${songEnv}/songs`);
  // console.log(`response`, response.data.songs);
  return response.data.songs;
};

// Function to add a song via the API
const addSongToAPI = async (song: Song): Promise<Song> => {
  const response = await axios.post(`${songEnv}/songs`, song);
  console.log(`response`, response);
  return response.data;
};

// Function to update a song via the API
const updateSongInAPI = async (
  id: string,
  song: Partial<Song>
): Promise<Song> => {
  const response = await axios.put(`${songEnv}/songs/${id}`, song);
  return response.data;
};

// Function to delete a song via the API
const deleteSongFromAPI = async (id: string): Promise<void> => {
  await axios.delete(`${songEnv}/songs/${id}`);
};

// Function to toggle favorite status of a song
const toggleFavoriteInAPI = async (id: string): Promise<void> => {
  await axios.patch(`${songEnv}/songs/${id}/toggle-favorite`);
};

// Function to get stats from the API
const getStatsFromAPI = async (): Promise<any> => {
  const response = await axios.get(`${songEnv}/songs/stat`);
  console.log(`response`, response);
  return response.data;
};

// Generator function to handle fetching songs
function* fetchSongsSaga(): Generator<any, void, Song[]> {
  try {
    const songs: Song[] = yield call(fetchSongsFromAPI);
    yield put({ type: SET_SONGS, payload: songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

// Generator function to handle adding a song
function* addSongSaga(action: {
  type: string;
  payload: Song;
}): Generator<any, void, Song> {
  try {
    const song: Song = yield call(addSongToAPI, action.payload);
    yield put({ type: ADD_SONG, payload: song });
  } catch (error) {
    console.error("Error adding song:", error);
  }
}

// Generator function to handle updating a song
function* updateSongSaga(action: {
  type: string;
  payload: { id: string; song: Partial<Song> };
}): Generator<any, void, Song> {
  try {
    const { id, song } = action.payload;
    const updatedSong: Song = yield call(updateSongInAPI, id, song);
    yield put({ type: UPDATE_SONG, payload: { id, song: updatedSong } });
  } catch (error) {
    console.error("Error updating song:", error);
  }
}

// Generator function to handle deleting a song
function* deleteSongSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, void> {
  try {
    yield call(deleteSongFromAPI, action.payload);
    yield put({ type: DELETE_SONG, payload: action.payload });
  } catch (error) {
    console.error("Error deleting song:", error);
  }
}

// Generator function to handle toggling favorite status
function* toggleFavoriteSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, void> {
  try {
    yield call(toggleFavoriteInAPI, action.payload);
    yield put({ type: FETCH_SONGS }); // Fetch songs after toggling favorite
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
}

// Generator function to handle fetching stats
function* getStatsSaga(): Generator<any, void> {
  try {
    const stats: any = yield call(getStatsFromAPI);
    yield put(setSongStats(stats));
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
}

// Root saga
export default function* songSaga() {
  yield takeEvery(FETCH_SONGS, fetchSongsSaga);
  yield takeEvery(ADD_SONG, addSongSaga);
  yield takeEvery(UPDATE_SONG, updateSongSaga);
  yield takeEvery(DELETE_SONG, deleteSongSaga);
  yield takeEvery(TOGGLE_FAVORITE, toggleFavoriteSaga);
  yield takeEvery(GET_STATS, getStatsSaga);
}
