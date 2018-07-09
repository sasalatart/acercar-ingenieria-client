import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';
import pick from 'lodash/pick';
import schema, { CURRENT_SCHEMA_VERSION, getSchemaVersion } from './schema';
import i18n from './i18n';
import entities, { INITIAL_STATE as INITIAL_ENTITIES_STATE } from './entities';
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
import videoLinks from './video-links';
import credits from './credits';
import loading from './loading';

const appReducer = combineReducers({
  schema,
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
  videoLinks,
  credits,
  loading,
  loadingBar: loadingBarReducer,
});

const TO_KEEP_ON_SIGN_OUT = {
  keys: ['schema', 'i18n', 'announcements'],
  entitiesKeys: ['announcements'],
};

const TO_KEEP_ON_SCHEMA_VERSION_CHANGE = {
  keys: ['sessions'],
  entitiesKeys: [],
};

function getAlterations(state, type) {
  return {
    session: type === `${TYPES.SIGN_OUT}_PENDING` || type === `${TYPES.DESTROY_ACCOUNT}_PENDING` || type === TYPES.LOCAL_SIGN_OUT,
    schemaVersion: !!state && CURRENT_SCHEMA_VERSION !== getSchemaVersion(state),
  };
}

export default function rootReducer(state, action) {
  const alterations = getAlterations(state, action.type);

  if (!alterations.session && !alterations.schemaVersion) return appReducer(state, action);

  const toKeep = alterations.session
    ? TO_KEEP_ON_SIGN_OUT
    : TO_KEEP_ON_SCHEMA_VERSION_CHANGE;

  const newState = {
    ...pick(state, toKeep.keys),
    entities: INITIAL_ENTITIES_STATE
      .merge(state.entities.filter((value, key) => toKeep.entitiesKeys.includes(key))),
  };

  return appReducer(newState, action);
}
