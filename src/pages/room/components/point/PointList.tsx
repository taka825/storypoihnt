import React, { useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import PointCard from 'pages/room/components/point/PointCard';
import { makeStyles } from '@material-ui/core/styles';
import { useStoryPointsRef } from 'common/firebase/network/room';
import { RootState } from 'redux/rootReducer';
import { Point, setPoints } from 'common/firebase/redux/pointsSlice';
import { QueryPrams } from 'pages/room/Room';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: '4em',
  },
}));

const PointList: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { roomId } = useParams<QueryPrams>();
  const currentStoryId = useSelector((state: RootState) =>
    _.get(state, 'stories.currentStoryId'),
  );
  const storyPointsRef = useStoryPointsRef(roomId);

  const points: [string, Point][] = useSelector((state: RootState) =>
    _.get(state, `points.payload.${currentStoryId}`, []),
  );

  useEffect(() => {
    storyPointsRef.on(
      'value',
      (childSnapshot: firebase.database.DataSnapshot) => {
        dispatch(setPoints(childSnapshot.val()));
      },
    );
  }, [storyPointsRef, dispatch]);

  return (
    <Container maxWidth="md" className={classes.container}>
      {points.map((value, index) => {
        return (
          <PointCard
            key={index.toString()}
            user={value[1].user}
            point={value[1].point}
          />
        );
      })}
    </Container>
  );
};

export default PointList;
