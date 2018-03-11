import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
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
  intl: { formatMessage: t },
}) {
  const adminOfMajorsIds = map(adminOfMajors, 'id');

  return (
    <div>
      <AdminStatusSwitch userId={id} label={`Admin (${t({ id: 'platform' })})`} active={admin} />
      {majorsOfInterest.map(majorOfInterest => (
        <AdminStatusSwitch
          key={`${id}-${majorOfInterest.majorId}`}
          userId={id}
          majorId={majorOfInterest.majorId}
          label={majorOfInterest.name}
          active={adminOfMajorsIds.includes(majorOfInterest.majorId)}
        />
      ))}
    </div>
  );
}

AdminStatusPanel.propTypes = {
  user: userShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(AdminStatusPanel);
