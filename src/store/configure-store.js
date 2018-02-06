import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import root from './ducks';

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, root);

const middleware = [
  thunkMiddleware,
  promiseMiddleware(),
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
