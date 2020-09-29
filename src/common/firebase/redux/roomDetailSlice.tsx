import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomDetailState {
  payload: RoomDetail | null;
}

export interface RoomDetail {
  roomName: string;
  roomCreator: { uid: string };
  createTimestamp: number;
  updateTimestamp: number;
}

export interface RoomCreateAction {
  roomName: string;
}

const initialState: RoomDetailState = {
  payload: null,
};

const roomDetailSlice = createSlice({
  name: 'roomDetail',
  initialState,
  reducers: {
    setRoomDetail: (
      state: RoomDetailState,
      action: PayloadAction<RoomDetail>,
    ) => {
      state.payload = action.payload;
    },
  },
});

export const { setRoomDetail } = roomDetailSlice.actions;

export default roomDetailSlice.reducer;
