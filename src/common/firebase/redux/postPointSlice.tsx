import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'common/firebase/firebase';

interface PostPointState {
  success: boolean;
  loading: boolean;
  error: firebase.functions.HttpsError | null;
}

export interface PostPointAction {
  roomId: string;
  point: number;
  callback?: (roomId: string) => void;
}

const initialState: PostPointState = {
  success: false,
  loading: false,
  error: null,
};

const postPointSlice = createSlice({
  name: 'postPoint',
  initialState,
  reducers: {
    postPoint: (
      state: PostPointState,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<PostPointAction>,
    ) => {
      state.success = initialState.success;
      state.loading = true;
      state.error = initialState.error;
    },
    postPointSuccess: (state: PostPointState) => {
      state.success = true;
      state.loading = false;
    },
    postPointFailure: (
      state: PostPointState,
      action: PayloadAction<firebase.functions.HttpsError>,
    ) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  postPoint,
  postPointSuccess,
  postPointFailure,
} = postPointSlice.actions;

export default postPointSlice.reducer;
