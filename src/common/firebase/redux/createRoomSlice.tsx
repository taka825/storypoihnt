import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'common/firebase/firebase';

interface CreateRoomState {
  success: boolean;
  loading: boolean;
  error: firebase.functions.HttpsError | null;
}

export interface CreateRoomAction {
  roomName: string;
  callback?: (roomId: string) => void;
}

const initialState: CreateRoomState = {
  success: false,
  loading: false,
  error: null,
};

const createRoomSlice = createSlice({
  name: 'createRoom',
  initialState,
  reducers: {
    createRoom: (
      state: CreateRoomState,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<CreateRoomAction>,
    ) => {
      state.success = initialState.success;
      state.loading = true;
      state.error = initialState.error;
    },
    createRoomSuccess: (state: CreateRoomState) => {
      state.success = true;
      state.loading = false;
    },
    createRoomFailure: (
      state: CreateRoomState,
      action: PayloadAction<firebase.functions.HttpsError>,
    ) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createRoom,
  createRoomSuccess,
  createRoomFailure,
} = createRoomSlice.actions;

export default createRoomSlice.reducer;
