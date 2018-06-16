import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Comment from '../../containers/Comments/Comment';

export default function Comments() {
  return (
    <Switch>
      <Route path="/comments/:commentId/comments/:id" component={Comment} />
      <Route path="/comments/:id" component={Comment} />
    </Switch>
  );
}
