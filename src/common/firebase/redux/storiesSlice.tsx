import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoriesState {
  currentStoryId: string | null;
  payload: [string, Story][];
}

export interface Story {
  title: string;
  explain: string;
  file?: {
    path: string;
    name: string;
  };
  room: { roomId: string };
  storyCreator: {
    uid: string;
  };
  createTimestamp: number;
  updateTimestamp: number;
}

export interface SetCurrentStoryIdAction {
  storyId: string;
}

const initialState: StoriesState = {
  currentStoryId: null,
  payload: [],
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setCuurentStoryId: (
      state: StoriesState,
      action: PayloadAction<SetCurrentStoryIdAction>,
    ) => {
      state.currentStoryId = action.payload.storyId;
    },
    setStories: (
      state: StoriesState,
      action: PayloadAction<[string, Story][]>,
    ) => {
      action.payload.sort((a, b) => {
        if (a[1].createTimestamp < b[1].createTimestamp) return -1;
        if (a[1].createTimestamp > b[1].createTimestamp) return 1;
        return 0;
      });
      state.payload = action.payload;
    },
  },
});

export const { setCuurentStoryId, setStories } = storiesSlice.actions;

export default storiesSlice.reducer;
