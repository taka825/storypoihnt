import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

interface CommentsState {
  payload: {
    [key: string]: [string, Comment][];
  };
}

export interface Comment {
  comment: string;
  user: {
    uid: string;
    displayName: string;
    photoUrl: string;
  };
  createTimestamp: number;
  updateTimestamp: number;
}

export interface SetCommentsAction {
  [storyId: string]: {
    [commentId: string]: Comment;
  };
}

const initialState: CommentsState = {
  payload: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (
      state: CommentsState,
      action: PayloadAction<SetCommentsAction>,
    ) => {
      _.forEach(action.payload, (comments, key) => {
        state.payload[key] = _.toPairs<Comment>(comments);
      });
      _.forEach(state.payload, (comments) => {
        comments.sort((a, b) => {
          if (a[1].createTimestamp < b[1].createTimestamp) return -1;
          if (a[1].createTimestamp > b[1].createTimestamp) return 1;
          return 0;
        });
      });
    },
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
