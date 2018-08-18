import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withAuthorization from '../../../hoc/withAuthorization';
import withModal from '../../../hoc/withModal';
import SearchButtons from '../../../containers/Search/Buttons';
import EmailForm from '../../../containers/Majors/Major/Email/Form';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../Icons/HideableButton';

function UsersActionBar({
  adminOrMajorAdmin,
  majorId,
  admins,
  renderModal,
  onModalOpen,
  resetPagination,
}) {
  const actions = [
    <SearchButtons
      key="search"
      searchTextLabel={<FormattedMessage id="search.users" />}
      beforeSearch={resetPagination}
    />,
  ];

  if (adminOrMajorAdmin && !admins && majorId) {
    const contactButton = (
      <HideableButton key="email" onClick={onModalOpen} icon="envelope">
        <FormattedMessage id="majors.email" />
      </HideableButton>
    );

    actions.push(contactButton);
  }

  return (
    <Fragment>
      <ActionBar actions={actions} />

      {renderModal(<FormattedMessage id="majors.email" />, <EmailForm majorId={majorId} />)}
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
};

UsersActionBar.defaultProps = {
  majorId: undefined,
};

export default withAuthorization(withModal(UsersActionBar));
