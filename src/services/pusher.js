import Pusher from 'pusher-js';
import humps from 'humps';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { getTokens } from '../store/ducks/sessions';
import { BASE_API_URL } from '../lib/routes';

export const CHANNELS = {
  USER: userId => `private-user-${userId}`,
};

export const EVENTS = {
  NOTIFICATIONS_COUNT: 'notifications-count',
};

export default class PusherService {
  static getInstance() {
    if (isEmpty(this.tokens)) return this.disconnect();
    if (this.instance) return this.instance;

    this.instance = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: `${BASE_API_URL}/pusher/auth`,
      auth: {
        headers: humps.decamelizeKeys(this.tokens),
      },
      encrypted: true,
    });

    return this.instance;
  }

  static setCurrentTokens(tokens) {
    this.tokens = tokens;
  }

  static disconnect() {
    this.tokens = undefined;

    if (!this.instance) return;
    this.instance.disconnect();
    this.instance = undefined;
  }

  static lifecycleManagerFactory(getState) {
    let previousTokens = getTokens(getState());

    return () => {
      const tokens = getTokens(getState());

      if (!isEmpty(previousTokens) && isEmpty(tokens)) this.disconnect();
      if (!isEqual(previousTokens, tokens)) this.setCurrentTokens(tokens);

      previousTokens = { ...tokens };
    };
  }
}
