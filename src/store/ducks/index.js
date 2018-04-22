import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';
import pick from 'lodash/pick';
import i18n from './i18n';
import entities, {
  INITIAL_STATE as INITIAL_ENTITIES_STATE,
} from './entities';
import sessions, { TYPES } from './sessions';
import notifications from './notifications';
import announcements from './announcements';
import users from './users';
import admins from './admins';
import majors from './majors';
import questions from './questions';
import articles from './articles';
import discussions from './discussions';
import categories from './categories';
import comments from './comments';
import credits from './credits';
import loading from './loading';

const appReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  i18n,
  entities,
  sessions,
  notifications,
  announcements,
  users,
  admins,
  majors,
  questions,
  articles,
  discussions,
  categories,
  comments,
  credits,
  loading,
  loadingBar: loadingBarReducer,
});

const TO_KEEP_ON_SIGN_OUT = ['i18n', 'announcements'];

export default function rootReducer(state, action) {
  if (action.type !== `${TYPES.SIGN_OUT}_PENDING` && action.type !== `${TYPES.DESTROY_ACCOUNT}_PENDING`) {
    return appReducer(state, action);
  }

  const newState = {
    ...pick(state, TO_KEEP_ON_SIGN_OUT),
    entities: INITIAL_ENTITIES_STATE
      .merge(state.entities.filter((value, key) => TO_KEEP_ON_SIGN_OUT.includes(key))),
  };

  return appReducer(newState, action);
}
