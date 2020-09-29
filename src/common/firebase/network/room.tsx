/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import firebase, { database } from 'common/firebase/firebase';
import { RoomListItem } from 'common/firebase/redux/roomListSlice';
import { RoomDetail } from 'common/firebase/redux/roomDetailSlice';
import { Story } from 'common/firebase/redux/storiesSlice';
import { Point } from 'common/firebase/redux/pointsSlice';
import { Comment } from 'common/firebase/redux/commentsSlice';

const RoomListRef = 'roomList';
const RoomDetailRef = 'roomDetail';
const StoriesRef = 'stories';
const StoryCommensRef = 'storyComments';
const StoryPointsRef = 'storyPoints';

// Room List
export const setRoomList = (
  roomListItem: RoomListItem,
  uuid: string,
): Promise<any> => {
  return database.ref(`${RoomListRef}/${uuid}`).set(roomListItem);
};

export const setRoomJoinUser = (roomId: string, uid: string): Promise<any> => {
  return database
    .ref(`${RoomListRef}/${roomId}/joinUsers`)
    .set({ [uid]: true });
};

export const useRoomListRef = (): firebase.database.Reference =>
  useMemo(() => database.ref(RoomListRef), []);

// Room Detail
export const setRoomDetail = (
  roomDetail: RoomDetail,
  uuid: string,
): Promise<any> => {
  return database.ref(`${RoomDetailRef}/${uuid}`).set(roomDetail);
};

export const useRoomDetailRef = (roomId: string): firebase.database.Reference =>
  useMemo(() => database.ref(`${RoomDetailRef}/${roomId}`), [roomId]);

// Story
export const setStory = (
  story: Story,
  roomId: string,
  uuid: string,
): Promise<any> => {
  return database.ref(`${StoriesRef}/${roomId}/${uuid}`).set(story);
};

export const useStoryRef = (roomId: string): firebase.database.Reference =>
  useMemo(() => database.ref(`${StoriesRef}/${roomId}`), [roomId]);

// Sotry Point
export const setPoint = (
  point: Point,
  roomId: string,
  storyId: string,
  uid: string,
): Promise<any> => {
  return database
    .ref(`${StoryPointsRef}/${roomId}/${storyId}/${uid}`)
    .set(point);
};

export const useStoryPointsRef = (
  roomId: string,
): firebase.database.Reference =>
  useMemo(() => database.ref(`${StoryPointsRef}/${roomId}`), [roomId]);

// Story Comment
export const setComment = (
  comment: Comment,
  roomId: string,
  storyId: string,
  uuid: string,
): Promise<any> => {
  return database
    .ref(`${StoryCommensRef}/${roomId}/${storyId}/${uuid}`)
    .set(comment);
};

export const useStoryCommentsRef = (
  roomId: string,
): firebase.database.Reference =>
  useMemo(() => database.ref(`${StoryCommensRef}/${roomId}`), [roomId]);
