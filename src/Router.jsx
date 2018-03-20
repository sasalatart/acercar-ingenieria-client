import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from './store/configure-store';
import LoggedOutRoute from './containers/Routes/LoggedOut';
import LoggedInRoute from './containers/Routes/LoggedIn';
import AdminRoute from './containers/Routes/Admin';
import QuestionsPrivilegesRoute from './containers/Routes/QuestionsPrivileges';
import ArticlePrivilegesRoute from './containers/Routes/ArticlePrivileges';
import DiscussionPrivilegesRoute from './containers/Routes/DiscussionPrivileges';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EmailConfirmation from './containers/SignUp/EmailConfirmation';
import PinnedAnnouncements from './containers/Announcements/Pinned';
import Announcements from './containers/Announcements/List';
import Profile from './containers/Profile';
import Users from './containers/Users';
import Majors from './containers/Majors';
import NewMajor from './components/Majors/New';
import Major from './containers/Major';
import Articles from './components/Articles';
import ArticleForm from './containers/Articles/Form';
import Article from './containers/Article';
import Questions from './components/Questions';
import Discussions from './components/Discussions';
import DiscussionForm from './containers/Discussions/Form';
import Discussion from './containers/Discussion';
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

function renderDiscussionPrivilegesRoute(component) {
  return props => <DiscussionPrivilegesRoute {...props} component={component} />;
}

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PinnedAnnouncements} />
          <Route exact path="/announcements" render={renderAdminRoute(Announcements)} />

          <Route exact path="/sign-in" render={renderLoggedOutRoute(SignIn)} />
          <Route exact path="/sign-up" render={renderLoggedOutRoute(SignUp)} />

          <Route path="/profile" component={renderLoggedInRoute(Profile)} />
          <Route exact path="/users" component={renderAdminRoute(Users)} />
          <Route exact path="/users/:id" component={renderLoggedInRoute(Profile)} />

          <Route exact path="/majors" component={Majors} />
          <Route exact path="/majors/new" render={renderAdminRoute(NewMajor)} />
          <Route exact path="/majors/:majorId/articles/new" component={renderLoggedInRoute(ArticleForm)} />
          <Route exact path="/majors/:majorId/articles/:id" component={Article} />
          <Route exact path="/majors/:majorId/articles/:id/edit" render={renderArticlePrivilegesRoute(ArticleForm)} />
          <Route path="/majors/:id" component={Major} />

          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/new" component={renderLoggedInRoute(ArticleForm)} />
          <Route exact path="/articles/:id" component={Article} />
          <Route exact path="/articles/:id/edit" component={renderArticlePrivilegesRoute(ArticleForm)} />

          <Route exact path="/questions/:pending?" render={renderQuestionsPrivilegesRoute(Questions)} />

          <Route exact path="/discussions/new" component={renderLoggedInRoute(DiscussionForm)} />
          <Route exact path="/discussions/:id" component={renderLoggedInRoute(Discussion)} />
          <Route exact path="/discussions/:id/edit" component={renderDiscussionPrivilegesRoute(DiscussionForm)} />
          <Route exact path="/discussions/:mine?" render={renderLoggedInRoute(Discussions)} />

          <Route exact path="/about-us" component={AboutUs} />

          <Route exact path="/auth/confirmation" component={EmailConfirmation} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
}
