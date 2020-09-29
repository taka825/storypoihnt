import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Point from 'pages/room/components/point/Point';
import UserAvatar from 'common/icon/UserAvatar';
import { Point as PointInterface } from 'common/firebase/redux/pointsSlice';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '16em',
    marginBottom: theme.spacing(2),
  },
}));

const PointCard: React.FC<PointInterface> = ({ user, point }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<UserAvatar iconFileName={user.photoUrl} />}
        title={user.displayName}
      />
      <CardContent>
        <Point point={point} />
      </CardContent>
    </Card>
  );
};

export default PointCard;
