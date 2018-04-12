import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  renderLoggedInRoute,
  renderArticleCreationRoute,
  renderArticleAdministrationRoute,
} from '../../containers/Routes';
import Comment from '../../containers/Comments/Comment';
import List from '../../containers/Articles/List';
import Form from '../../containers/Articles/Form';
import Article from '../../containers/Articles/Article';

function Articles() {
  return (
    <Switch>
      <Route path="/articles/:articleId/comments/:id" render={renderLoggedInRoute(Comment)} />
      <Route path="/articles/:id/edit" render={renderArticleAdministrationRoute(Form)} />
      <Route path="/articles/new" render={renderArticleCreationRoute(Form)} />
      <Route path="/articles/:id" component={Article} />
      <Route path="/articles" component={List} />
    </Switch>
  );
}

export default Articles;
