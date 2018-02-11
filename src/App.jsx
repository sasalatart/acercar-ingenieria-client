import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { StyleRoot } from 'radium';
import 'antd/dist/antd.min.css';
import configureStore, { history } from './store/configure-store';
import LoggedOutRoute from './containers/Routes/LoggedOut';
import IntlProvider from './containers/IntlProvider';
import Landing from './containers/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Majors from './components/Majors';
import Articles from './components/Articles';
import Questions from './components/Questions';
import AboutUs from './components/AboutUs';
import Layout from './components/Layout';

const { store, persistor } = configureStore();

function renderLoggedOutRoute(component) {
  return props => <LoggedOutRoute {...props} component={component} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleRoot>
          <IntlProvider>
            <ConnectedRouter history={history}>
              <Layout>
                <Route exact path="/" component={Landing} />
                <Route exact path="/sign-in" render={renderLoggedOutRoute(SignIn)} />
                <Route exact path="/sign-up" render={renderLoggedOutRoute(SignUp)} />
                <Route exact path="/majors" component={Majors} />
                <Route exact path="/articles" component={Articles} />
                <Route exact path="/questions" component={Questions} />
                <Route exact path="/about-us" component={AboutUs} />
              </Layout>
            </ConnectedRouter>
          </IntlProvider>
        </StyleRoot>
      </PersistGate>
    </Provider>
  );
}
