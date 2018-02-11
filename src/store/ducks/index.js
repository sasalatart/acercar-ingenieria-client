import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import i18n from './i18n';
import entities from './entities';
import sessions, { TYPES } from './sessions';

const appReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  i18n,
  entities,
  sessions,
});

export default function rootReducer(state, action) {
  return action.type === `${TYPES.SIGN_OUT}_FULFILLED`
    ? appReducer(undefined, action)
    : appReducer(state, action);
}
