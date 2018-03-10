import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';
import ActionBar from '../../../containers/Layout/ActionBar';

function AnnouncementsActionBar({ onCreateClicked, intl: { formatMessage: t } }) {
  const actions = [
    <Button type="primary" icon="form" onClick={onCreateClicked}>
      {t({ id: 'forms.create' })}
    </Button>,
  ];

  return <ActionBar actions={actions} />;
}

AnnouncementsActionBar.propTypes = {
  onCreateClicked: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(AnnouncementsActionBar);
