import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Button } from 'antd';
import ActionBar from '../../containers/Layout/ActionBar';

function MajorsActionBar({ hasAdminPrivileges, goToMajorsNew, intl: { formatMessage: t } }) {
  const actions = hasAdminPrivileges
    ? [<Button type="primary" onClick={goToMajorsNew}>{t({ id: 'majors.new' })}</Button>]
    : undefined;

  return <ActionBar actions={actions} />;
}

MajorsActionBar.propTypes = {
  hasAdminPrivileges: PropTypes.bool.isRequired,
  goToMajorsNew: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default MajorsActionBar;
