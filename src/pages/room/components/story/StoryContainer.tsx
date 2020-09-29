import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import CommentDrawer from 'pages/room/components/comment/CommentDrawer';
import Story from 'pages/room/components/story/Story';
import StoryControl from 'pages/room/components/story/StoryControl';
import PointSummary from 'pages/room/components/point/PointSummary';
import PointList from 'pages/room/components/point/PointList';
import PointControl from 'pages/room/components/point/PointControl';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from 'pages/room/components/comment/CommentDrawer';
import { RootState } from 'redux/rootReducer';
import {
  setCuurentStoryId,
  Story as StoryInterface,
} from 'common/firebase/redux/storiesSlice';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    width: `calc(100% - ${drawerWidth})`,
  },
}));

const StoryContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentStoryId = useSelector((state: RootState) =>
    _.get(state, 'stories.currentStoryId'),
  );

  const stories = useSelector((state: RootState) =>
    _.get(state, 'stories.payload'),
  );

  useEffect(() => {
    if (currentStoryId === null) {
      const latestStory = _.last<[string, StoryInterface]>(stories);
      if (latestStory) {
        dispatch(setCuurentStoryId({ storyId: latestStory[0] }));
      }
    }
  }, [stories, currentStoryId, dispatch]);

  if (!currentStoryId) return null;

  return (
    <main className={classes.container}>
      <Story />
      <PointSummary />
      <PointList />
      <StoryControl />
      <PointControl />
      <CommentDrawer />
    </main>
  );
};

export default StoryContainer;
