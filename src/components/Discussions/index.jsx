import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { discussionAdministrationRoute } from '../../containers/Routes';
import Comment from '../../containers/Comments/Comment';
import List from '../../containers/Discussions/List';
import Form from '../../containers/Discussions/Form';
import Discussion from '../../containers/Discussions/Discussion';

export default function Discussions() {
  return (
    <Switch>
      <Route path="/discussions/:discussionId/comments/:id" component={Comment} />
      <Route path="/discussions/:id/edit" render={discussionAdministrationRoute(Form)} />
      <Route path="/discussions/new" component={Form} />
      <Route path="/discussions/mine" render={props => <List {...props} mine />} />
      <Route path="/discussions/:id" component={Discussion} />
      <Route path="/discussions" component={List} />
    </Switch>
  );
}
