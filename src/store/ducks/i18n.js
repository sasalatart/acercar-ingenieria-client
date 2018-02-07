import { Map } from 'immutable';
import { createSelector } from 'reselect';

const INITIAL_STATE = new Map({
  locale: 'es-ES',
});

const TYPES = {
  SET_LOCALE: 'i18n/SET_LOCALE',
};

export function setLocale(locale) {
  return {
    type: TYPES.SET_LOCALE,
    payload: {
      locale,
    },
  };
}

export default function i18nReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.SET_LOCALE:
      return state.set('locale', action.payload.locale);
    default:
      return state;
  }
}

export const getI18nData = state => state.i18n;

export const getLocale = createSelector(
  getI18nData,
  i18nData => i18nData.get('locale'),
);
