import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/ButtonLink';
import ROUTES from '../../../routes';

function MajorsActionBar({ admin, intl: { formatMessage: t } }) {
  const actions = [];

  if (admin) {
    actions.push(<ButtonLink to={ROUTES.MAJORS_NEW} content={t({ id: 'majors.new' })} />);
  }

  return <ActionBar actions={actions} />;
}

MajorsActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(MajorsActionBar));
