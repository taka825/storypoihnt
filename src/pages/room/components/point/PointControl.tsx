import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Filter1Icon from '@material-ui/icons/Filter1';
import Fab from '@material-ui/core/Fab';
import { Theme, makeStyles } from '@material-ui/core/styles';

import { drawerWidth } from 'pages/room/components/comment/CommentDrawer';
import { showModal } from 'common/modal/redux/rootModalSlice';
import ModalType from 'common/modal/config/ModalType';
import { QueryPrams } from 'pages/room/Room';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    position: 'fixed',
    right: `calc(${theme.spacing(2)}px + ${drawerWidth})`,
    bottom: theme.spacing(2),
  },
}));

const PointControl: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomId } = useParams<QueryPrams>();

  const showSelectPointForm = useCallback(() => {
    dispatch(showModal({ type: ModalType.SelectPoint, props: { roomId } }));
  }, [dispatch, roomId]);

  return (
    <Fab
      color="primary"
      className={classes.button}
      onClick={showSelectPointForm}>
      <Filter1Icon />
    </Fab>
  );
};

export default PointControl;
