import React, { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RootState } from 'redux/rootReducer';
import { showModal } from 'common/modal/redux/rootModalSlice';
import ModalType from 'common/modal/config/ModalType';
import { setCuurentStoryId } from 'common/firebase/redux/storiesSlice';
import { QueryPrams } from 'pages/room/Room';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'fixed',
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const StoryControl: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomId } = useParams<QueryPrams>();

  const currentStoryId = useSelector((state: RootState) =>
    _.get(state, 'stories.currentStoryId'),
  );

  const storyIndexes = useSelector((state: RootState) => {
    const currentStoryIndex = _.findIndex(
      state.stories.payload,
      (object) => object[0] === currentStoryId,
    );
    if (currentStoryIndex === 0) {
      const sliceIndexes = _.slice(state.stories.payload, 0, 2);
      return {
        prev: null,
        next: _.get(sliceIndexes, '1.0', null),
      };
    } else {
      const sliceIndexes = _.slice(
        state.stories.payload,
        currentStoryIndex - 1,
      );
      return {
        prev: _.get(sliceIndexes, '0.0', null),
        next: _.get(sliceIndexes, '2.0', null),
      };
    }
  });

  const handlePrevStoryClick = useCallback(() => {
    dispatch(setCuurentStoryId({ storyId: storyIndexes.prev }));
  }, [storyIndexes, dispatch]);

  const handleNextStoryClick = useCallback(() => {
    dispatch(setCuurentStoryId({ storyId: storyIndexes.next }));
  }, [storyIndexes, dispatch]);

  const handleNewStoryClick = useCallback(() => {
    dispatch(showModal({ type: ModalType.CreateStory, props: { roomId } }));
  }, [dispatch, roomId]);

  return (
    <div className={classes.container}>
      <Fab
        variant="extended"
        size="small"
        color="default"
        className={classes.button}
        disabled={storyIndexes.prev === null}
        onClick={handlePrevStoryClick}>
        <ArrowLeftIcon />
        前のストーリー
      </Fab>
      <Fab
        variant="extended"
        size="small"
        color="default"
        className={classes.button}
        disabled={storyIndexes.next === null}
        onClick={handleNextStoryClick}>
        次のストーリー
        <ArrowRightIcon />
      </Fab>
      <Fab
        variant="extended"
        size="small"
        color="default"
        className={classes.button}
        onClick={handleNewStoryClick}>
        新しいストーリー
        <LaunchIcon />
      </Fab>
    </div>
  );
};

export default StoryControl;
