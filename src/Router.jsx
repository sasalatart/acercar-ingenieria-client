import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { history } from './store/configure-store';
import LoggedOutRoute from './containers/Routes/LoggedOut';
import LoggedInRoute from './containers/Routes/LoggedIn';
import PinnedAnnouncements from './containers/Announcements/Pinned';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EmailConfirmation from './containers/SignUp/EmailConfirmation';
import Profile from './containers/Profile';
import Majors from './containers/Majors';
import Major from './containers/Major';
import Articles from './components/Articles';
import Questions from './components/Questions';
import AboutUs from './components/AboutUs';
import Layout from './components/Layout';

function renderLoggedOutRoute(component) {
  return props => <LoggedOutRoute {...props} component={component} />;
}

function renderLoggedInRoute(component) {
  return props => <LoggedInRoute {...props} component={component} />;
}

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route exact path="/" component={PinnedAnnouncements} />
        <Route exact path="/sign-in" render={renderLoggedOutRoute(SignIn)} />
        <Route exact path="/sign-up" render={renderLoggedOutRoute(SignUp)} />
        <Route path="/profile" component={renderLoggedInRoute(Profile)} />
        <Route exact path="/users/:userId" component={renderLoggedInRoute(Profile)} />
        <Route exact path="/majors" component={Majors} />
        <Route path="/majors/:majorId" component={Major} />
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/questions" component={Questions} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/auth/confirmation" component={EmailConfirmation} />
      </Layout>
    </ConnectedRouter>
  );
}
