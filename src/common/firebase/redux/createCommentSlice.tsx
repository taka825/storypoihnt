import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'common/firebase/firebase';

interface CreateCommentState {
  success: boolean;
  loading: boolean;
  error: firebase.functions.HttpsError | null;
}

export interface CreateCommentAction {
  roomId: string;
  comment: string;
}

const initialState: CreateCommentState = {
  success: false,
  loading: false,
  error: null,
};

const createCommentSlice = createSlice({
  name: 'createComment',
  initialState,
  reducers: {
    createComment: (
      state: CreateCommentState,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<CreateCommentAction>,
    ) => {
      state.success = initialState.success;
      state.loading = true;
      state.error = initialState.error;
    },
    createCommentSuccess: (state: CreateCommentState) => {
      state.success = true;
      state.loading = false;
    },
    createCommentFailure: (
      state: CreateCommentState,
      action: PayloadAction<firebase.functions.HttpsError>,
    ) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createComment,
  createCommentSuccess,
  createCommentFailure,
} = createCommentSlice.actions;

export default createCommentSlice.reducer;
