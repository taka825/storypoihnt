import React from 'react';
import _ from 'lodash';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

const RouteWithAuth: React.FC<RouteProps> = (props: RouteProps) => {
  const loading = useSelector((state: RootState) =>
    _.get(state, 'auth.loading'),
  );
  const user = useSelector((state: RootState) =>
    _.get(state, 'auth.payload.user', null),
  );

  if (loading) return <></>;

  if (user) return <Route path={props.path} component={props.component} />;

  return <Redirect to="/" />;
};

export default RouteWithAuth;
