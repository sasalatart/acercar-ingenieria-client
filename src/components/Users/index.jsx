import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  renderAdminRoute,
  renderLoggedInRoute,
} from '../../containers/Routes';
import AllUsers from '../../containers/Users/All';
import Profile from '../../containers/Users/Profile';

function Users() {
  return (
    <Switch>
      <Route path="/users/profile" render={renderLoggedInRoute(Profile, { mine: true })} />
      <Route path="/users/:id" render={renderLoggedInRoute(Profile)} />
      <Route path="/users" render={renderAdminRoute(AllUsers)} />
    </Switch>
  );
}

export default Users;
