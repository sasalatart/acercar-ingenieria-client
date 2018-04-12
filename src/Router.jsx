import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from './store/configure-store';
import {
  renderAdminRoute,
  renderQuestionsAdministrationRoute,
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
import Layout from './components/Layout';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PinnedAnnouncements} />
          <Route exact path="/announcements" render={renderAdminRoute(Announcements)} />
          <Route path="/auth" component={Auth} />
          <Route path="/users" component={Users} />
          <Route path="/majors" component={Majors} />
          <Route path="/articles" component={Articles} />
          <Route path="/questions/:pending?" render={renderQuestionsAdministrationRoute(Questions)} />
          <Route path="/discussions" component={Discussions} />
          <Route path="/comments" component={Comments} />
          <Route path="/about-us" component={AboutUs} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
}
