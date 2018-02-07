import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import i18n from './i18n';
import entities from './entities';

export default combineReducers({
  router: routerReducer,
  i18n,
  entities,
});
