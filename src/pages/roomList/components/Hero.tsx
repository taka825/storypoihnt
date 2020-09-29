import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { showModal } from 'common/modal/redux/rootModalSlice';
import ModalType from 'common/modal/config/ModalType';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const Hero: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showNewRoomForm = useCallback(() => {
    dispatch(showModal({ type: ModalType.CreateRoom }));
  }, [dispatch]);

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Story Point
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={showNewRoomForm}>
                新しいルームを作る
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
