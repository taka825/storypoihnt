import React from 'react';
import _ from 'lodash';
import { RoomListItem } from 'common/firebase/redux/roomListSlice';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

interface Props {
  roomId: string;
  roomListItem: RoomListItem;
}

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
  },
}));

const RoomCard: React.FC<Props> = ({ roomId, roomListItem }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {roomListItem.roomName}
        </Typography>
        <Typography variant="caption">
          {_.size(roomListItem.joinUsers)}名参加中
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button component={Link} size="small" to={`/room/${roomId}`}>
          入室する
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoomCard;
