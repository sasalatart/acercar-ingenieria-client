import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  renderAdminRoute,
  renderLoggedInRoute,
  renderArticlePrivilegesRoute,
} from '../../containers/Routes';
import List from '../../containers/Majors/List';
import Major from '../../containers/Majors/Major';
import ArticleForm from '../../containers/Articles/Form';
import Article from '../../containers/Articles/Article';
import New from './New';

export default function Majors() {
  return (
    <Switch>
      <Route path="/majors/:majorId/articles/:id/edit" render={renderArticlePrivilegesRoute(ArticleForm)} />
      <Route path="/majors/:majorId/articles/new" render={renderLoggedInRoute(ArticleForm)} />
      <Route path="/majors/:majorId/articles/:id" component={Article} />
      <Route path="/majors/new" render={renderAdminRoute(New)} />
      <Route path="/majors/:id" component={Major} />
      <Route path="/majors" component={List} />
    </Switch>
  );
}
