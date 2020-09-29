import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

interface PointsState {
  payload: {
    [key: string]: [string, Point][];
  };
}

export interface Point {
  point: number;
  user: {
    uid: string;
    displayName: string;
    photoUrl: string;
  };
}

export interface SetPointsAction {
  [storyId: string]: {
    [pointId: string]: Point;
  };
}

const initialState: PointsState = {
  payload: {},
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setPoints: (state: PointsState, action: PayloadAction<SetPointsAction>) => {
      _.forEach(action.payload, (points, key) => {
        state.payload[key] = _.toPairs<Point>(points);
      });
    },
  },
});

export const { setPoints } = pointsSlice.actions;

export default pointsSlice.reducer;
