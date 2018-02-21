import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import i18n from './i18n';
import entities from './entities';
import sessions, { TYPES } from './sessions';
import announcements from './announcements';
import users from './users';
import admins from './admins';
import questions from './questions';

const appReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  i18n,
  entities,
  sessions,
  announcements,
  users,
  admins,
  questions,
});

export default function rootReducer(state, action) {
  return action.type === `${TYPES.SIGN_OUT}_PENDING`
    ? appReducer(undefined, action)
    : appReducer(state, action);
}
