import { notification } from 'antd';
import { TYPES, resourceSuccessNotification } from '../ducks/notifications';

function getCategory(created, updated, destroyed) {
  if (created) return 'created';
  if (updated) return 'updated';
  if (destroyed) return 'destroyed';
  return undefined;
}

const notificationsMiddleware = store => next => (action) => {
  const { type, payload, meta } = action;

  if (type === TYPES.DISPLAY) {
    notification[payload.type](payload);
  }

  if (meta && (meta.create || meta.update || meta.destroy) && type.includes('FULFILLED')) {
    store.dispatch(resourceSuccessNotification(
      meta.collection.slice(0, -1),
      getCategory(meta.create, meta.update, meta.destroy),
    ));
  }

  return next(action);
};

export default notificationsMiddleware;
