import React, { useCallback } from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

interface Props {
  point: number;
  className?: string;
  onClick?: (value: number) => void;
}

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: blue[500],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '12em',
    height: '12em',
    '&:hover': {
      backgroundColor: blue[300],
    },
  },
  point: {
    color: 'white',
  },
}));

const Point: React.FC<Props> = ({ point, onClick, className }) => {
  const classes = useStyles();

  const handlePointClick = useCallback(() => {
    if (onClick) onClick(point);
  }, [onClick, point]);

  return (
    <Button
      component={Paper}
      className={`${classes.container} ${className}`}
      variant="outlined"
      color="primary"
      onClick={handlePointClick}
      disabled={!_.isFunction(onClick)}>
      <Typography variant="h2" component="span" className={classes.point}>
        {point}
      </Typography>
    </Button>
  );
};

export default Point;
