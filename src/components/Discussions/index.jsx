import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  renderLoggedInRoute,
  renderDiscussionAdministrationRoute,
} from '../../containers/Routes';
import List from '../../containers/Discussions/List';
import Form from '../../containers/Discussions/Form';
import Discussion from '../../containers/Discussions/Discussion';

export default function Discussions() {
  return (
    <Switch>
      <Route path="/discussions/:id/edit" render={renderDiscussionAdministrationRoute(Form)} />
      <Route path="/discussions/new" render={renderLoggedInRoute(Form)} />
      <Route path="/discussions/mine" render={renderLoggedInRoute(List, { mine: true })} />
      <Route path="/discussions/:id" render={renderLoggedInRoute(Discussion)} />
      <Route path="/discussions" render={renderLoggedInRoute(List)} />
    </Switch>
  );
}
