import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import createHistory from 'history/createBrowserHistory';
import root from './ducks';
import fetchMiddleWare from './middlewares/fetch';
import notificationsMiddleware from './middlewares/notifications';
import PusherService from '../services/pusher';

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['router', 'form'],
};

const persistedReducer = persistReducer(persistConfig, root);

export const history = createHistory();

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  fetchMiddleWare,
  notificationsMiddleware,
  promiseMiddleware(),
  loadingBarMiddleware(),
];

let store;
let persistor;

export default () => {
  if (!store) {
    store = createStore(
      persistedReducer,
      // eslint-disable-next-line no-underscore-dangle, no-undef
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(...middleware),
    );
  }

  if (!persistor) {
    persistor = persistStore(store);
  }

  store.subscribe(PusherService.lifecycleManagerFactory(store.getState));

  return { store, persistor };
};
