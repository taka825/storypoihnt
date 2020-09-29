import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'common/firebase/firebase';

interface CreateStoryState {
  success: boolean;
  loading: boolean;
  error: firebase.functions.HttpsError | null;
}

export interface CreateStoryAction {
  roomId: string;
  title: string;
  explain: string;
  file?: File;
  callback?: (storyId: string) => void;
}

const initialState: CreateStoryState = {
  success: false,
  loading: false,
  error: null,
};

const createStorySlice = createSlice({
  name: 'createStory',
  initialState,
  reducers: {
    createStory: (
      state: CreateStoryState,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<CreateStoryAction>,
    ) => {
      state.success = initialState.success;
      state.loading = true;
      state.error = initialState.error;
    },
    createStorySuccess: (state: CreateStoryState) => {
      state.success = true;
      state.loading = false;
    },
    createStoryFailure: (
      state: CreateStoryState,
      action: PayloadAction<firebase.functions.HttpsError>,
    ) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createStory,
  createStorySuccess,
  createStoryFailure,
} = createStorySlice.actions;

export default createStorySlice.reducer;
