import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { setStory } from 'common/firebase/network/room';
import { putSotryFile } from 'common/firebase/network/storage';
import {
  CreateStoryAction,
  createStory,
  createStorySuccess,
  createStoryFailure,
} from 'common/firebase/redux/createStorySlice';
import { Story } from 'common/firebase/redux/storiesSlice';
import { hideModal } from 'common/modal/redux/rootModalSlice';

function* storyCreater(action: PayloadAction<CreateStoryAction>) {
  const uid = yield select((state) => state.auth.payload.user.uid);
  const timestamp = new Date().getTime();

  const storyId = uuidv4();

  if (action.payload.file) {
    try {
      yield call(putSotryFile, storyId, action.payload.file);

      const story: Story = {
        title: action.payload.title,
        explain: action.payload.explain,
        room: { roomId: action.payload.roomId },
        storyCreator: { uid },
        createTimestamp: timestamp,
        updateTimestamp: timestamp,
        file: {
          name: action.payload.file.name,
          path: `${storyId}/${action.payload.file.name}`,
        },
      };

      try {
        yield call(setStory, story, action.payload.roomId, storyId);
        yield put(createStorySuccess());
      } catch (error) {
        yield put(createStoryFailure(error));
      }
    } catch (error) {
      yield put(createStoryFailure(error));
    }
  } else {
    const story: Story = {
      title: action.payload.title,
      explain: action.payload.explain,
      room: { roomId: action.payload.roomId },
      storyCreator: { uid },
      createTimestamp: timestamp,
      updateTimestamp: timestamp,
    };

    try {
      yield call(setStory, story, action.payload.roomId, storyId);
      yield put(createStorySuccess());
    } catch (error) {
      yield put(createStoryFailure(error));
    }
  }

  yield put(hideModal());
  if (_.isFunction(action.payload.callback)) {
    action.payload.callback(storyId);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* storyWatcher() {
  yield takeLatest(createStory, storyCreater);
}
