import { combineReducers } from "redux";
import { songReducer } from "./songReducer";

// import userReducer from "./userReducer";

const rootReducer = combineReducers({
  songs: songReducer,
  //   users: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
