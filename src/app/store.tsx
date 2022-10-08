import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "@/states/user/userSlice";
import friendSlice from "@/states/user/friendSlice";

const combinedReducer = combineReducers({
  user: userSlice,
  friend: friendSlice,
});

// @ts-ignore
const rootReducer = (state, action) => {
  console.log(action.type);
  if (action.type === "user/setUserLoggedOut") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
