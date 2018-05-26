import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithAuthorization from '../../../../hoc/WithAuthorization';
import ActionBar from '../../../../containers/Layout/ActionBar';
import HideableButton from '../../../HideableButton';
import routes from '../../../../lib/routes';

function MajorInfoActionBar({ id, adminOrMajorAdmin, intl: { formatMessage: t } }) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const contactButton = (
      <HideableButton to={routes.majorEdit(id)} icon="edit">
        {t({ id: 'majors.edit' })}
      </HideableButton>
    );

    actions.push(contactButton);
  }

  return <ActionBar actions={actions} />;
}

MajorInfoActionBar.propTypes = {
  id: PropTypes.number.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(MajorInfoActionBar));
