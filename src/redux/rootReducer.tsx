import { combineReducers } from '@reduxjs/toolkit';

import rootModalReducer from 'common/modal/redux/rootModalSlice';
import authReducer from 'common/firebase/redux/authSlice';
import createRoomReducer from 'common/firebase/redux/createRoomSlice';
import roomListReducer from 'common/firebase/redux/roomListSlice';
import roomDetailReducer from 'common/firebase/redux/roomDetailSlice';
import joinRoomReducer from 'common/firebase/redux/joinRoomSlice';
import createStoryReducer from 'common/firebase/redux/createStorySlice';
import storiesReducer from 'common/firebase/redux/storiesSlice';
import createCommentReducer from 'common/firebase/redux/createCommentSlice';
import commentsReducer from 'common/firebase/redux/commentsSlice';
import postPointReducer from 'common/firebase/redux/postPointSlice';
import pointsReducer from 'common/firebase/redux/pointsSlice';

const rootReducer = combineReducers({
  rootModal: rootModalReducer,
  auth: authReducer,
  createRoom: createRoomReducer,
  roomList: roomListReducer,
  roomDetail: roomDetailReducer,
  joinRoom: joinRoomReducer,
  createStory: createStoryReducer,
  stories: storiesReducer,
  createComment: createCommentReducer,
  comments: commentsReducer,
  postPoint: postPointReducer,
  points: pointsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
