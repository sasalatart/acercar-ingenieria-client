import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import withAuthorization from '../../hoc/withAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../Icons/HideableButton';

function CreditsActionBar({
  admin,
  onNewClicked,
  intl: { formatMessage: t },
}) {
  const actions = [];

  if (admin) {
    const createButton = (
      <HideableButton type="primary" icon="plus" onClick={onNewClicked}>
        {t({ id: 'credits.new' })}
      </HideableButton>
    );

    actions.push(createButton);
  }

  return <ActionBar actions={actions} />;
}

CreditsActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
  onNewClicked: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(withAuthorization(CreditsActionBar));
