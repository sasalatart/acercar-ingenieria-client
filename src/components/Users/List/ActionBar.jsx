import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import SearchButtons from '../../../containers/Search/Buttons';
import EmailForm from '../../../containers/Majors/Major/Email/Form';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../HideableButton';

function UsersActionBar({
  adminOrMajorAdmin,
  majorId,
  admins,
  renderModal,
  onModalOpen,
  resetPagination,
  intl: { formatMessage: t },
}) {
  const actions = [
    <SearchButtons
      key="search"
      searchTextLabel={t({ id: 'search.users' })}
      beforeSearch={resetPagination}
    />,
  ];

  if (adminOrMajorAdmin && !admins && majorId) {
    const contactButton = (
      <HideableButton key="email" onClick={onModalOpen} icon="mail">
        {t({ id: 'majors.email' })}
      </HideableButton>
    );

    actions.push(contactButton);
  }

  return (
    <Fragment>
      <ActionBar actions={actions} />

      {renderModal(t({ id: 'majors.email' }), <EmailForm majorId={majorId} />)}
    </Fragment>
  );
}

UsersActionBar.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  majorId: PropTypes.number,
  admins: PropTypes.bool.isRequired,
  renderModal: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  resetPagination: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

UsersActionBar.defaultProps = {
  majorId: undefined,
};

export default UsersActionBar;
