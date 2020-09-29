import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import firebase from 'common/firebase/firebase';
import {
  signInAnonymous,
  updateProfile,
  signOut,
  setLocalPersistence,
} from 'common/firebase/network/auth';
import { getIconFileURL } from 'common/firebase/network/storage';
import {
  UserUpdateAction,
  FetchUserIconAction,
  fetchAnonymousUser,
  fetchAnonymousUserSuccess,
  fetchAnonymousUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  signOutUser,
  fetchUserIcon,
} from 'common/firebase/redux/authSlice';

function* userFetcher() {
  try {
    const result = yield call(signInAnonymous);
    yield call(setLocalPersistence);
    yield put(fetchAnonymousUserSuccess(result));
  } catch (error) {
    yield put(fetchAnonymousUserFailure(error));
  }
}

function* userUpdater(action: PayloadAction<UserUpdateAction>) {
  const user = firebase.auth().currentUser;
  try {
    yield call(
      { context: undefined, fn: updateProfile },
      user,
      action.payload.displayName,
      action.payload.photoURL,
    );
    yield put(updateUserSuccess(user));
    if (_.isFunction(action.payload.callback)) {
      action.payload.callback();
    }
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

function* userSignOut() {
  try {
    yield call(signOut);
    yield put(signOutUser);
  } catch (error) {
    console.log(error);
  }
}

function* userIconFetcher(action: PayloadAction<FetchUserIconAction>) {
  try {
    const url = yield call(
      { context: undefined, fn: getIconFileURL },
      action.payload.fileName,
    );
    if (_.isFunction(action.payload.callback)) {
      action.payload.callback(url);
    }
  } catch (error) {
    console.log(error);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* authWatcher() {
  yield takeLatest(fetchAnonymousUser, userFetcher);
  yield takeLatest(updateUser, userUpdater);
  yield takeLatest(signOutUser, userSignOut);
  yield takeEvery(fetchUserIcon, userIconFetcher);
}
