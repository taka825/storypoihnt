import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  setRoomList,
  setRoomDetail,
  setRoomJoinUser,
} from 'common/firebase/network/room';
import { RoomListItem } from 'common/firebase/redux/roomListSlice';
import { RoomDetail } from 'common/firebase/redux/roomDetailSlice';
import {
  CreateRoomAction,
  createRoom,
  createRoomSuccess,
  createRoomFailure,
} from 'common/firebase/redux/createRoomSlice';
import {
  JoinRoomAction,
  joinRoom,
  joinRoomFailure,
  joinRoomSuccess,
} from 'common/firebase/redux/joinRoomSlice';

function* roomCreater(action: PayloadAction<CreateRoomAction>) {
  const uid = yield select((state) => state.auth.payload.user.uid);
  const timestamp = new Date().getTime();

  const roomId = uuidv4();

  const roomDetail: RoomDetail = {
    roomName: action.payload.roomName,
    roomCreator: { uid: uid },
    createTimestamp: timestamp,
    updateTimestamp: timestamp,
  };

  const roomListItem: RoomListItem = {
    roomName: action.payload.roomName,
    roomCreator: { uid },
    createTimestamp: timestamp,
    updateTimestamp: timestamp,
  };

  try {
    yield call(setRoomDetail, roomDetail, roomId);
    yield call(setRoomList, roomListItem, roomId);
    yield put(createRoomSuccess());
  } catch (error) {
    yield put(createRoomFailure(error));
  }

  if (_.isFunction(action.payload.callback)) {
    action.payload.callback(roomId);
  }
}

function* roomJoin(action: PayloadAction<JoinRoomAction>) {
  const uid = yield select((state) => state.auth.payload.user.uid);

  try {
    yield call(setRoomJoinUser, action.payload.roomId, uid);
    yield put(joinRoomSuccess());
  } catch (error) {
    yield put(joinRoomFailure(error));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* roomWatcher() {
  yield takeLatest(createRoom, roomCreater);
  yield takeLatest(joinRoom, roomJoin);
}
