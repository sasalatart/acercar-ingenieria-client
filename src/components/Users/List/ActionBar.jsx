import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import SearchButtons from '../../../containers/Search/Buttons';
import ActionBar from '../../../containers/Layout/ActionBar';

function UsersActionBar({ resetPagination, intl: { formatMessage: t } }) {
  const actions = [
    <SearchButtons
      searchTextLabel={t({ id: 'search.users' })}
      beforeSearch={resetPagination}
    />,
  ];
  return <ActionBar actions={actions} />;
}

UsersActionBar.propTypes = {
  resetPagination: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default UsersActionBar;
