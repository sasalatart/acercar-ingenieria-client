import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from './store/configure-store';
import LoggedOutRoute from './containers/Routes/LoggedOut';
import LoggedInRoute from './containers/Routes/LoggedIn';
import AdminRoute from './containers/Routes/Admin';
import QuestionsPrivilegesRoute from './containers/Routes/QuestionsPrivileges';
import ArticlePrivilegesRoute from './containers/Routes/ArticlePrivileges';
import PinnedAnnouncements from './containers/Announcements/Pinned';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EmailConfirmation from './containers/SignUp/EmailConfirmation';
import Profile from './containers/Profile';
import Majors from './containers/Majors';
import Major from './containers/Major';
import NewMajor from './components/Majors/New';
import Article from './containers/Article';
import Articles from './components/Articles';
import Questions from './containers/Questions';
import ArticleForm from './containers/Articles/Form';
import AboutUs from './components/AboutUs';
import Layout from './components/Layout';

function renderLoggedOutRoute(component) {
  return props => <LoggedOutRoute {...props} component={component} />;
}

function renderLoggedInRoute(component) {
  return props => <LoggedInRoute {...props} component={component} />;
}

function renderAdminRoute(component) {
  return props => <AdminRoute {...props} component={component} />;
}

function renderQuestionsPrivilegesRoute(component) {
  return props => <QuestionsPrivilegesRoute {...props} component={component} />;
}

function renderArticlePrivilegesRoute(component) {
  return props => <ArticlePrivilegesRoute {...props} component={component} />;
}

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PinnedAnnouncements} />
          <Route exact path="/sign-in" render={renderLoggedOutRoute(SignIn)} />
          <Route exact path="/sign-up" render={renderLoggedOutRoute(SignUp)} />
          <Route path="/profile" component={renderLoggedInRoute(Profile)} />
          <Route exact path="/users/:userId" component={renderLoggedInRoute(Profile)} />
          <Route exact path="/majors" component={Majors} />
          <Route exact path="/majors/new" render={renderAdminRoute(NewMajor)} />
          <Route exact path="/majors/:majorId/articles/:articleId" component={Article} />
          <Route exact path="/majors/:majorId/articles/:articleId/edit" render={renderArticlePrivilegesRoute(ArticleForm)} />
          <Route path="/majors/:majorId" component={Major} />
          <Route exact path="/articles/:articleId" component={Article} />
          <Route exact path="/articles/new" component={ArticleForm} />
          <Route exact path="/articles/:articleId/edit" component={renderArticlePrivilegesRoute(ArticleForm)} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/questions/:pending?" render={renderQuestionsPrivilegesRoute(Questions)} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/auth/confirmation" component={EmailConfirmation} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
}
