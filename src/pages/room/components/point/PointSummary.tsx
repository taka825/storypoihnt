import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Point } from 'common/firebase/redux/pointsSlice';
import { RootState } from 'redux/rootReducer';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) => ({
  summary: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  chip: { marginRight: theme.spacing(1) },
}));

const PointSummary: React.FC = () => {
  const classes = useStyles();
  const currentStoryId = useSelector((state: RootState) =>
    _.get(state, 'stories.currentStoryId'),
  );

  const summary: {
    maxPoint: number;
    minPoint: number;
    avgPoint: number;
  } = useSelector((state: RootState) => {
    const points: [string, Point][] = _.get(
      state,
      `points.payload.${currentStoryId}`,
      [],
    );
    if (points.length === 0) return { maxPoint: 0, minPoint: 0, avgPoint: 0 };
    const maxPointObject = _.maxBy(points, (object) => object[1].point);
    const minPointObject = _.minBy(points, (object) => object[1].point);
    const sumPoint = _.sumBy(points, (object) => object[1].point);
    const avgPoint = _.floor(sumPoint / points.length, 2);
    return {
      maxPoint: _.get(maxPointObject, '1.point', 0),
      minPoint: _.get(minPointObject, '1.point', 0),
      avgPoint,
    };
  });

  return (
    <div className={classes.summary}>
      <Chip
        className={classes.chip}
        variant="outlined"
        size="small"
        label={`最大: ${summary.maxPoint}`}
      />
      <Chip
        className={classes.chip}
        variant="outlined"
        size="small"
        label={`最小: ${summary.minPoint}`}
      />
      <Chip
        className={classes.chip}
        variant="outlined"
        size="small"
        label={`平均: ${summary.avgPoint}`}
      />
    </div>
  );
};

export default PointSummary;
