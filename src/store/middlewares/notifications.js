import { notification } from 'antd';
import { TYPES } from '../ducks/notifications';

// eslint-disable-next-line no-unused-vars
const notificationsMiddleware = store => next => (action) => {
  if (action.type === TYPES.DISPLAY) {
    notification[action.payload.type](action.payload);
  }

  return next(action);
};

export default notificationsMiddleware;
