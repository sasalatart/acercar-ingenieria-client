import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../Icons/HideableButton';

function AnnouncementsActionBar({ onCreateClicked }) {
  const actions = [
    <HideableButton type="primary" icon="plus" onClick={onCreateClicked}>
      <FormattedMessage id="forms.create" />
    </HideableButton>,
  ];

  return <ActionBar actions={actions} />;
}

AnnouncementsActionBar.propTypes = {
  onCreateClicked: PropTypes.func.isRequired,
};

export default AnnouncementsActionBar;
