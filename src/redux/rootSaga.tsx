import { all } from 'redux-saga/effects';
import authWatcher from 'common/firebase/redux/authSaga';
import roomWatcher from 'common/firebase/redux/roomSaga';
import storyWatcher from 'common/firebase/redux/storySaga';
import commentWatcher from 'common/firebase/redux/commentSaga';
import pointsWatcher from 'common/firebase/redux/pointsSaga';

export default function* rootSaga(): Generator {
  yield all([
    authWatcher(),
    roomWatcher(),
    storyWatcher(),
    commentWatcher(),
    pointsWatcher(),
  ]);
}
