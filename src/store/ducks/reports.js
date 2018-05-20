import { resourceSuccessNotification } from './notifications';

export const TYPES = {
  REPORT: 'reports/REPORT',
};

export function report(id, collection, body) {
  return dispatch =>
    dispatch({
      type: TYPES.REPORT,
      payload: {
        method: 'POST',
        url: `/${collection}/${id}/reports`,
        fetchParams: { collection, id },
        body: {
          ...body,
          resourceUrl: window.location.href,
        },
      },
    }).then(() => {
      dispatch(resourceSuccessNotification('report', 'sent'));
    });
}
