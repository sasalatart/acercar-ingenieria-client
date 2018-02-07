import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import configureStore, { history } from './store/configure-store';
import IntlProvider from './containers/IntlProvider';
import LocaleSelect from './containers/LocaleSelect';
import Landing from './containers/Landing';
import Majors from './containers/Majors';

const { store, persistor } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProvider>
          <ConnectedRouter history={history}>
            <div>
              <LocaleSelect />
              <Route exact path="/" component={Landing} />
              <Route path="/majors" component={Majors} />
            </div>
          </ConnectedRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>
  );
}
