import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withAuthorization from '../../hoc/withAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../Icons/HideableButton';

function VideosActionBar({ adminOrMajorAdmin, onNewClicked }) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const newVideoLinkButton = (
      <HideableButton type="primary" icon="plus" onClick={onNewClicked}>
        <FormattedMessage id="videoLinks.new" />
      </HideableButton>
    );

    actions.push(newVideoLinkButton);
  }

  return <ActionBar actions={actions} />;
}

VideosActionBar.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  onNewClicked: PropTypes.func.isRequired,
};

export default withAuthorization(VideosActionBar);
