import keyMirror from 'keymirror';

export const NOTIFICATION_TYPES = keyMirror({
  success: null, info: null, warning: null, error: null, open: null,
});

export const TYPES = {
  DISPLAY: 'notifications/DISPLAY',
};

export function displayNotification({
  message, description, type = NOTIFICATION_TYPES.open, duration = 20,
}) {
  return {
    type: TYPES.DISPLAY,
    payload: {
      message,
      description,
      type,
      duration,
    },
  };
}
