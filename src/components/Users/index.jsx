import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { adminRoute } from '../../containers/Routes';
import AllUsers from '../../containers/Users/All';
import Profile from '../../containers/Users/Profile';

function Users() {
  return (
    <Switch>
      <Route path="/users/profile" render={props => <Profile {...props} mine />} />
      <Route path="/users/:id" component={Profile} />
      <Route path="/users" render={adminRoute(AllUsers)} />
    </Switch>
  );
}

export default Users;
