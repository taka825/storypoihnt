import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import RoomTitleBar from 'pages/room/components/RoomTitleBar';
import Toolbar from '@material-ui/core/Toolbar';
import StoryContainer from 'pages/room/components/story/StoryContainer';
import { showModal } from 'common/modal/redux/rootModalSlice';
import ModalType from 'common/modal/config/ModalType';
import { RootState } from 'redux/rootReducer';
import { useRoomDetailRef, useStoryRef } from 'common/firebase/network/room';
import { setRoomDetail } from 'common/firebase/redux/roomDetailSlice';
import { joinRoom } from 'common/firebase/redux/joinRoomSlice';
import EmptyState from 'pages/room//components/EmptyState';
import {
  setStories,
  Story as StoryInterface,
} from 'common/firebase/redux/storiesSlice';

export interface QueryPrams {
  roomId: string;
}

const Room: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams<QueryPrams>();
  const roomDetailRef = useRoomDetailRef(roomId);
  const storyRef = useStoryRef(roomId);

  const displayName = useSelector((state: RootState) =>
    _.get(state, 'auth.payload.user.displayName', null),
  );

  const stories = useSelector((state: RootState) =>
    _.get(state, 'stories.payload'),
  );

  useEffect(() => {
    dispatch(joinRoom({ roomId }));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (!displayName) {
      dispatch(showModal({ type: ModalType.RegistName }));
    }
  }, [displayName, dispatch]);

  useEffect(() => {
    roomDetailRef.on(
      'value',
      (childSnapshot: firebase.database.DataSnapshot) => {
        dispatch(setRoomDetail(childSnapshot.val()));
        if (childSnapshot.val() === null) history.replace('/');
      },
    );
  }, [roomDetailRef, history, dispatch]);

  useEffect(() => {
    storyRef.on('value', (childSnapshot: firebase.database.DataSnapshot) => {
      dispatch(setStories(_.toPairs<StoryInterface>(childSnapshot.val())));
    });
  }, [storyRef, dispatch]);

  return (
    <>
      <RoomTitleBar />
      <Toolbar />
      {stories.length === 0 ? <EmptyState /> : <StoryContainer />}
    </>
  );
};

export default Room;
