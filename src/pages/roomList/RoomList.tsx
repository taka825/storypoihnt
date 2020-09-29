import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import firebase from 'common/firebase/firebase';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Hero from 'pages/roomList/components/Hero';
import RoomCard from 'pages/roomList/components/RoomCard';
import { setRoomList, RoomListItem } from 'common/firebase/redux/roomListSlice';
import { useRoomListRef } from 'common/firebase/network/room';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const RoomList: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const roomListRef = useRoomListRef();

  const roomList: [string, RoomListItem][] = useSelector((state) =>
    _.get(state, 'roomList.payload', []),
  );

  useEffect(() => {
    roomListRef.on('value', (childSnapshot: firebase.database.DataSnapshot) => {
      dispatch(setRoomList(_.toPairs<RoomListItem>(childSnapshot.val())));
    });
  }, [roomListRef, dispatch]);

  return (
    <>
      <Hero />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {roomList.map((value: [string, RoomListItem], index: number) => (
              <Grid item key={index.toString()} xs={12} sm={6} md={4}>
                <RoomCard roomId={value[0]} roomListItem={value[1]} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default RoomList;
