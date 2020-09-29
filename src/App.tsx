import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RouteWithAuth from 'common/router/RouteWithAuth';
import RootModal from 'common/modal/RootModal';
import RoomList from 'pages/roomList/RoomList';
import Room from 'pages/room/Room';

import { fetchAnonymousUser } from 'common/firebase/redux/authSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnonymousUser());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RoomList} />
        <RouteWithAuth path="/room/:roomId" component={Room} />
      </Switch>
      <RootModal />
    </Router>
  );
};

export default App;
