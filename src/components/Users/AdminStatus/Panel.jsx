import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import map from 'lodash/map';
import AdminStatusSwitch from '../../../containers/Users/AdminStatus/Switch';
import { userShape } from '../../../shapes';

function AdminStatusPanel({
  user: {
    id,
    admin,
    majorsOfInterest,
    adminOfMajors,
  },
}) {
  const adminOfMajorsIds = map(adminOfMajors, 'id');

  return (
    <Fragment>
      <AdminStatusSwitch userId={id} label={<FormattedMessage id="admin.platform" />} active={admin} />
      {majorsOfInterest.map(majorOfInterest => (
        <AdminStatusSwitch
          key={`${id}-${majorOfInterest.majorId}`}
          userId={id}
          majorId={majorOfInterest.majorId}
          label={majorOfInterest.name}
          active={adminOfMajorsIds.includes(majorOfInterest.majorId)}
        />
      ))}
    </Fragment>
  );
}

AdminStatusPanel.propTypes = {
  user: userShape.isRequired,
};

export default AdminStatusPanel;
