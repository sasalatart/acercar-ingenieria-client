import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { StyleRoot } from 'radium';
import 'antd/dist/antd.min.css';
import configureStore, { history } from './store/configure-store';
import LoggedOutRoute from './containers/Routes/LoggedOut';
import LoggedInRoute from './containers/Routes/LoggedIn';
import IntlProvider from './containers/IntlProvider';
import PinnedAnnouncements from './containers/Announcements/Pinned';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import EmailConfirmation from './containers/SignUp/EmailConfirmation';
import Profile from './containers/Profile';
import Majors from './components/Majors';
import Articles from './components/Articles';
import Questions from './components/Questions';
import AboutUs from './components/AboutUs';
import Layout from './components/Layout';

const { store, persistor } = configureStore();

function renderLoggedOutRoute(component) {
  return props => <LoggedOutRoute {...props} component={component} />;
}

function renderLoggedInRoute(component) {
  return props => <LoggedInRoute {...props} component={component} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleRoot>
          <IntlProvider>
            <ConnectedRouter history={history}>
              <Layout>
                <Route exact path="/" component={PinnedAnnouncements} />
                <Route exact path="/sign-in" render={renderLoggedOutRoute(SignIn)} />
                <Route exact path="/sign-up" render={renderLoggedOutRoute(SignUp)} />
                <Route exact path="/profile" component={renderLoggedInRoute(Profile)} />
                <Route exact path="/users/:userId" component={renderLoggedInRoute(Profile)} />
                <Route exact path="/majors" component={Majors} />
                <Route exact path="/articles" component={Articles} />
                <Route exact path="/questions" component={Questions} />
                <Route exact path="/about-us" component={AboutUs} />
                <Route exact path="/auth/confirmation" component={EmailConfirmation} />
              </Layout>
            </ConnectedRouter>
          </IntlProvider>
        </StyleRoot>
      </PersistGate>
    </Provider>
  );
}
