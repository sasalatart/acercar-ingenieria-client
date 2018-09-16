import { Map } from 'immutable';
import { createSelector } from 'reselect';
import compact from 'lodash/compact';

const INITIAL_STATE = new Map({});

function getLoadingKeys(meta = {}) {
  const { page, baseId, id } = meta;
  return compact([page, baseId && id && `${baseId}-${id}`, baseId || id]).map(String);
}

function getKeyPath(requestName, meta = {}) {
  return meta.page && meta.baseId ? [requestName, String(meta.baseId)] : [requestName];
}

export default function loadingReducer(state = INITIAL_STATE, { type, meta }) {
  const matches = /(.*)_(PENDING|FULFILLED|REJECTED)/.exec(type);
  if (!matches) return state;
  const [, requestName, requestState] = matches;

  const loadingStatus = requestState === 'PENDING';
  const path = getKeyPath(requestName, meta);
  const key = getLoadingKeys(meta)[0];
  return key
    ? state.mergeIn(path, new Map({ [key]: loadingStatus }))
    : state.setIn(path, loadingStatus);
}

const getLoadingState = state => state.loading;
const getParams = (state, params) => params;

export function getIsRequestingFactory(requestName) {
  return createSelector(
    getLoadingState,
    getParams,
    (loadingState, params) => {
      const path = getKeyPath(requestName, params);
      const keys = getLoadingKeys(params);
      return keys.length === 0
        ? !!loadingState.getIn(path)
        : keys.reduce((acc, key) => acc || !!loadingState.getIn([...path, key]), false);
    },
  );
}
