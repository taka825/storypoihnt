import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { setPoint } from 'common/firebase/network/room';
import {
  PostPointAction,
  postPoint,
  postPointSuccess,
  postPointFailure,
} from 'common/firebase/redux/postPointSlice';
import { Point } from 'common/firebase/redux/pointsSlice';
import { RootState } from 'redux/rootReducer';

function* pointCreater(action: PayloadAction<PostPointAction>) {
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

  const pointId = uuidv4();

  const point: Point = {
    point: action.payload.point,
    user,
  };

  try {
    yield call(setPoint, point, action.payload.roomId, storyId, user.uid);
    yield put(postPointSuccess());
  } catch (error) {
    yield put(postPointFailure(error));
  }

  if (_.isFunction(action.payload.callback)) {
    action.payload.callback(pointId);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* pointWatcher() {
  yield takeLatest(postPoint, pointCreater);
}
