import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomListState {
  payload: [string, RoomListItem][];
}

export interface RoomListItem {
  roomName: string;
  roomCreator: { uid: string };
  joinUsers?: { [key: string]: boolean };
  createTimestamp: number;
  updateTimestamp: number;
}

const initialState: RoomListState = {
  payload: [],
};

const roomListSlice = createSlice({
  name: 'roomList',
  initialState,
  reducers: {
    setRoomList: (
      state: RoomListState,
      action: PayloadAction<[string, RoomListItem][]>,
    ) => {
      state.payload = action.payload;
    },
    pushRoomList: (
      state: RoomListState,
      action: PayloadAction<[string, RoomListItem]>,
    ) => {
      state.payload.push(action.payload);
    },
  },
});

export const { setRoomList, pushRoomList } = roomListSlice.actions;

export default roomListSlice.reducer;
