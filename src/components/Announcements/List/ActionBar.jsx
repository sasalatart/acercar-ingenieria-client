import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import HideableButton from '../../HideableButton';
import ActionBar from '../../../containers/Layout/ActionBar';

function AnnouncementsActionBar({ onCreateClicked, intl: { formatMessage: t } }) {
  const actions = [
    <HideableButton type="primary" icon="form" onClick={onCreateClicked}>
      {t({ id: 'forms.create' })}
    </HideableButton>,
  ];

  return <ActionBar actions={actions} />;
}

AnnouncementsActionBar.propTypes = {
  onCreateClicked: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(AnnouncementsActionBar);
