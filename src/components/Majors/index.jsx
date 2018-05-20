import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { loggedInRoute, adminRoute } from '../../containers/Routes';
import List from '../../containers/Majors/List';
import Major from '../../containers/Majors/Major';
import New from './New';

export default function Majors() {
  return (
    <Switch>
      <Route path="/majors/:majorId/comments/:id" component={loggedInRoute(Comment)} />
      <Route path="/majors/new" render={adminRoute(New)} />
      <Route path="/majors/:id" component={Major} />
      <Route path="/majors" component={List} />
    </Switch>
  );
}
