import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithAuthorization from '../../hoc/WithAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../HideableButton';

function VideosActionBar({
  adminOrMajorAdmin,
  onNewClicked,
  intl: { formatMessage: t },
}) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const newVideoLinkButton = (
      <HideableButton type="primary" icon="form" onClick={onNewClicked}>
        {t({ id: 'videoLinks.new' })}
      </HideableButton>
    );

    actions.push(newVideoLinkButton);
  }

  return <ActionBar actions={actions} />;
}

VideosActionBar.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  onNewClicked: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(VideosActionBar));
