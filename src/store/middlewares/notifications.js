import { notification } from 'antd';
import { TYPES, resourceSuccessNotification } from '../ducks/notifications';

function getCategory(created, updated, destroyed) {
  if (created) return 'created';
  if (updated) return 'updated';
  if (destroyed) return 'destroyed';
  return undefined;
}

const notificationsMiddleware = store => next => (action) => {
  if (action.type === TYPES.DISPLAY) {
    notification[action.payload.type](action.payload);
  }

  const created = action.type.includes('CREATE_FULFILLED');
  const updated = action.type.includes('UPDATE_FULFILLED');
  const destroyed = action.type.includes('DESTROY_FULFILLED');

  if (created || updated || destroyed) {
    const { collection } = action.payload.request.urlParams;
    store.dispatch(resourceSuccessNotification(
      collection.slice(0, -1),
      getCategory(created, updated, destroyed),
    ));
  }

  return next(action);
};

export default notificationsMiddleware;
