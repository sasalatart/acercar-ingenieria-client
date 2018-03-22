import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  renderLoggedInRoute,
  renderArticlePrivilegesRoute,
} from '../../containers/Routes';
import List from '../../containers/Articles/List';
import Form from '../../containers/Articles/Form';
import Article from '../../containers/Articles/Article';

function Articles() {
  return (
    <Switch>
      <Route path="/articles/:id/edit" render={renderArticlePrivilegesRoute(Form)} />
      <Route path="/articles/new" render={renderLoggedInRoute(Form)} />
      <Route path="/articles/:id" component={Article} />
      <Route path="/articles" component={List} />
    </Switch>
  );
}

export default Articles;
