import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';
import WithAuthorization from '../../hoc/WithAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import ROUTES from '../../routes';

function MajorsActionBar({ hasAdminPrivileges, intl: { formatMessage: t } }) {
  const actions = [];

  if (hasAdminPrivileges) {
    const newMajorHref = ROUTES.MAJORS_NEW;
    const linkToNewMajor = (
      <Link to={newMajorHref} href={newMajorHref}>
        <Button type="primary">{t({ id: 'majors.new' })}</Button>
      </Link>
    );
    actions.push(linkToNewMajor);
  }

  return <ActionBar actions={actions} />;
}

MajorsActionBar.propTypes = {
  hasAdminPrivileges: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(MajorsActionBar));
