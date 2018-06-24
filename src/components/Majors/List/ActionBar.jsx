import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import withAuthorization from '../../../hoc/withAuthorization';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../HideableButton';
import routes from '../../../lib/routes';

function MajorsActionBar({ admin, intl: { formatMessage: t } }) {
  const actions = [];

  if (admin) {
    const buttonLink = (
      <HideableButton to={routes.majorsNew} icon="plus">
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

export default injectIntl(withAuthorization(MajorsActionBar));
