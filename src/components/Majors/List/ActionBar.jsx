import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../HideableButton';
import ROUTES from '../../../routes';

function MajorsActionBar({ admin, intl: { formatMessage: t } }) {
  const actions = [];

  if (admin) {
    const buttonLink = (
      <HideableButton to={ROUTES.MAJORS_NEW} icon="plus">
        {t({ id: 'majors.new' })}
      </HideableButton>
    );

    actions.push(buttonLink);
  }

  return <ActionBar actions={actions} />;
}

MajorsActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(MajorsActionBar));
