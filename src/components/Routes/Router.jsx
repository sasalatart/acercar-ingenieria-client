import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../store/configure-store';
import AppLayout from '../Layout/App';
import {
  loggedOutRoute,
  loggedInRoute,
  adminRoute,
  questionsAdministrationRoute,
} from '../../containers/Routes';
import PinnedAnnouncements from '../../containers/Announcements/Pinned';
import Announcements from '../../containers/Announcements/List';
import Credits from '../../containers/Credits';
import Auth from '../Auth';
import Users from '../Users';
import Majors from '../Majors';
import Articles from '../Articles';
import Questions from '../Questions';
import Discussions from '../Discussions';
import Comments from '../Comments';
import AboutUs from '../AboutUs';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <AppLayout>
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
      </AppLayout>
    </ConnectedRouter>
  );
}
