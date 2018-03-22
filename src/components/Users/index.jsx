import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  renderAdminRoute,
  renderLoggedInRoute,
} from '../../containers/Routes';
import Search from '../../containers/Users/Search';
import Profile from '../../containers/Users/Profile';

function Users() {
  return (
    <Switch>
      <Route path="/users/profile" render={renderLoggedInRoute(Profile, { mine: true })} />
      <Route path="/users/:id" render={renderLoggedInRoute(Profile)} />
      <Route path="/users" render={renderAdminRoute(Search)} />
    </Switch>
  );
}

export default Users;
