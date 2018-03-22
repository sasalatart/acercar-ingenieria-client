import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from './store/configure-store';
import {
  renderLoggedOutRoute,
  renderAdminRoute,
  renderQuestionsPrivilegesRoute,
} from './containers/Routes';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EmailConfirmation from './containers/SignUp/EmailConfirmation';
import PinnedAnnouncements from './containers/Announcements/Pinned';
import Announcements from './containers/Announcements/List';
import Users from './components/Users';
import Majors from './components/Majors';
import Articles from './components/Articles';
import Questions from './components/Questions';
import Discussions from './components/Discussions';
import AboutUs from './components/AboutUs';
import Layout from './components/Layout';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PinnedAnnouncements} />
          <Route exact path="/announcements" render={renderAdminRoute(Announcements)} />
          <Route path="/sign-in" render={renderLoggedOutRoute(SignIn)} />
          <Route path="/sign-up" render={renderLoggedOutRoute(SignUp)} />
          <Route path="/users" component={Users} />
          <Route path="/majors" component={Majors} />
          <Route path="/articles" component={Articles} />
          <Route path="/questions/:pending?" render={renderQuestionsPrivilegesRoute(Questions)} />
          <Route path="/discussions" component={Discussions} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/auth/confirmation" component={EmailConfirmation} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
}
