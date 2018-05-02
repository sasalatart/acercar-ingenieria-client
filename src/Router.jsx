import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from './store/configure-store';
import {
  loggedOutRoute,
  loggedInRoute,
  adminRoute,
  questionsAdministrationRoute,
} from './containers/Routes';
import PinnedAnnouncements from './containers/Announcements/Pinned';
import Announcements from './containers/Announcements/List';
import Auth from './components/Auth';
import Users from './components/Users';
import Majors from './components/Majors';
import Articles from './components/Articles';
import Questions from './components/Questions';
import Discussions from './components/Discussions';
import Comments from './components/Comments';
import AboutUs from './components/AboutUs';
import Credits from './containers/Credits';
import Layout from './components/Layout';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PinnedAnnouncements} />
          <Route exact path="/announcements" render={adminRoute(Announcements)} />
          <Route path="/auth" render={loggedOutRoute(Auth)} />
          <Route path="/users" render={loggedInRoute(Users)} />
          <Route path="/majors" component={Majors} />
          <Route path="/articles" render={loggedInRoute(Articles)} />
          <Route path="/questions/:pending?" render={questionsAdministrationRoute(Questions)} />
          <Route path="/discussions" render={loggedInRoute(Discussions)} />
          <Route path="/comments" render={loggedInRoute(Comments)} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/credits" component={Credits} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
}
