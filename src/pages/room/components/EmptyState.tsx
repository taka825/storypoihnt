import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { showModal } from 'common/modal/redux/rootModalSlice';
import ModalType from 'common/modal/config/ModalType';
import { QueryPrams } from 'pages/room/Room';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  notice: {
    marginBottom: theme.spacing(4),
  },
  noticeTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
}));

const EmptyState: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomId } = useParams<QueryPrams>();

  const handleClick = useCallback(() => {
    dispatch(showModal({ type: ModalType.CreateStory, props: { roomId } }));
  }, [dispatch, roomId]);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Toolbar />
      <div className={classes.notice}>
        <Typography variant="h5" component="p" className={classes.noticeTitle}>
          ストーリーが登録されていません
        </Typography>
        <Typography>開始するにはまずストーリーを登録しましょう！</Typography>
      </div>
      <Button onClick={handleClick} variant="contained" color="primary">
        ストーリーを登録する
      </Button>
    </Container>
  );
};

export default EmptyState;
