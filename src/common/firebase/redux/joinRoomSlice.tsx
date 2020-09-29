import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'common/firebase/firebase';

interface JoinRoomState {
  success: boolean;
  loading: boolean;
  error: firebase.functions.HttpsError | null;
}

export interface JoinRoomAction {
  roomId: string;
}

const initialState: JoinRoomState = {
  success: false,
  loading: false,
  error: null,
};

const joinRoomSlice = createSlice({
  name: 'joinRoom',
  initialState,
  reducers: {
    joinRoom: (
      state: JoinRoomState,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<JoinRoomAction>,
    ) => {
      state.success = initialState.success;
      state.loading = true;
      state.error = initialState.error;
    },
    joinRoomSuccess: (state: JoinRoomState) => {
      state.success = true;
      state.loading = false;
    },
    joinRoomFailure: (
      state: JoinRoomState,
      action: PayloadAction<firebase.functions.HttpsError>,
    ) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  joinRoom,
  joinRoomSuccess,
  joinRoomFailure,
} = joinRoomSlice.actions;

export default joinRoomSlice.reducer;
