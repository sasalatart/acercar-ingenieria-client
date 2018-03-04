import {
  TYPES,
  setTokens,
  getTokens,
  getCurrentUserEntity,
} from '../../ducks/sessions';

const TOKEN_HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

export default function refreshTokens(response, store, actionType) {
  const state = store.getState();

  const loggedIn = !!getCurrentUserEntity(state) || actionType === TYPES.SIGN_IN;

  const tokens = getTokens(state);
  const newExpiry = response.headers.get('expiry');
  const refreshedToken = newExpiry && (!tokens.expiry || tokens.expiry < newExpiry);

  if (loggedIn && refreshedToken) {
    const newTokens = {};
    TOKEN_HEADERS.forEach((header) => { newTokens[header] = response.headers.get(header); });
    store.dispatch(setTokens(newTokens));
  }
}
