import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { RootState } from 'redux/rootReducer';
import { Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const RoomTtitleBar: React.FC = () => {
  const classes = useStyles();
  const roomName = useSelector((state: RootState) =>
    _.get(state, 'roomDetail.payload.roomName', ''),
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" component="h1">
          {roomName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default RoomTtitleBar;
