import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withAuthorization from '../../hoc/withAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../Icons/HideableButton';

function CreditsActionBar({ admin, onNewClicked }) {
  const actions = [];

  if (admin) {
    const createButton = (
      <HideableButton type="primary" icon="plus" onClick={onNewClicked}>
        <FormattedMessage id="credits.new" />
      </HideableButton>
    );

    actions.push(createButton);
  }

  return <ActionBar actions={actions} />;
}

CreditsActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
  onNewClicked: PropTypes.func.isRequired,
};

export default withAuthorization(CreditsActionBar);
