import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import configureStore, { history } from './store/configure-store';
import Landing from './containers/Landing';
import Majors from './containers/Majors';

const { store, persistor } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={Landing} />
            <Route path="/majors" component={Majors} />
          </div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}
