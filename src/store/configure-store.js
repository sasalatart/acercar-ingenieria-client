import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import root from './ducks';

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, root);

export const history = createHistory();

const middleware = [
  thunkMiddleware,
  promiseMiddleware(),
  routerMiddleware(history),
];

export default () => {
  const store = createStore(
    persistedReducer,
    // eslint-disable-next-line no-underscore-dangle, no-undef
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
