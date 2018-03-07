import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithAuthorization from '../../hoc/WithAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import ButtonLink from '../../containers/ButtonLink';
import ROUTES from '../../routes';

function MajorsActionBar({ hasAdminPrivileges, intl: { formatMessage: t } }) {
  const actions = [];

  if (hasAdminPrivileges) {
    actions.push(<ButtonLink to={ROUTES.MAJORS_NEW} content={t({ id: 'majors.new' })} />);
  }

  return <ActionBar actions={actions} />;
}

MajorsActionBar.propTypes = {
  hasAdminPrivileges: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(MajorsActionBar));
