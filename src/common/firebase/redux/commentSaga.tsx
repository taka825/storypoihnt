import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { setComment } from 'common/firebase/network/room';
import {
  CreateCommentAction,
  createComment,
  createCommentSuccess,
  createCommentFailure,
} from 'common/firebase/redux/createCommentSlice';
import { Comment } from 'common/firebase/redux/commentsSlice';
import { RootState } from 'redux/rootReducer';

function* commentCreater(action: PayloadAction<CreateCommentAction>) {
  const user = yield select((state: RootState) => {
    return {
      uid: _.get(state, 'auth.payload.user.uid'),
      displayName: _.get(state, 'auth.payload.user.displayName'),
      photoUrl: _.get(state, 'auth.payload.user.photoURL'),
    };
  });
  const storyId = yield select((state: RootState) =>
    _.get(state, 'stories.currentStoryId'),
  );
  const timestamp = new Date().getTime();

  const commentId = uuidv4();

  const comment: Comment = {
    comment: action.payload.comment,
    user,
    createTimestamp: timestamp,
    updateTimestamp: timestamp,
  };

  try {
    yield call(setComment, comment, action.payload.roomId, storyId, commentId);
    yield put(createCommentSuccess());
  } catch (error) {
    yield put(createCommentFailure(error));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* commentWatcher() {
  yield takeLatest(createComment, commentCreater);
}
