import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import Point from 'pages/room/components/point/Point';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { postPoint } from 'common/firebase/redux/postPointSlice';
import { Point as PointInterface } from 'common/firebase/redux/pointsSlice';
import { hideModal } from 'common/modal/redux/rootModalSlice';
import { RootState } from 'redux/rootReducer';
import { fibonacciNumber } from 'configs/fibonacci';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  point: {
    marginBottom: theme.spacing(2),
  },
  pointSelected: {
    borderColor: 'white',
    borderWidth: 2,
  },
}));

const SelectPointForm: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const roomId = useSelector((state: RootState) =>
    _.get(state, 'rootModal.props.roomId'),
  );

  const userPoint = useSelector((state: RootState) => {
    const uid = _.get(state, 'auth.payload.user.uid');
    const currentStoryId = _.get(state, 'stories.currentStoryId');
    const points: [string, PointInterface][] = _.get(
      state,
      `points.payload.${currentStoryId}`,
      [],
    );
    return points.find((element) => element[0] === uid);
  });

  const handlePointClick = useCallback(
    (value) => {
      dispatch(
        postPoint({
          point: value,
          roomId,
          callback: () => {
            dispatch(hideModal());
          },
        }),
      );
    },
    [dispatch, roomId],
  );

  const handleClose = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  return (
    <Dialog
      open
      PaperProps={{ className: classes.root }}
      onBackdropClick={handleClose}>
      <div className={classes.cardList}>
        {fibonacciNumber.map((value, index) => (
          <Point
            key={index.toString()}
            onClick={handlePointClick}
            point={value}
            className={
              userPoint && value === userPoint[1].point
                ? `${classes.point} ${classes.pointSelected}`
                : classes.point
            }
          />
        ))}
      </div>
    </Dialog>
  );
};

export default SelectPointForm;
