import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withAuthorization from '../../../../hoc/withAuthorization';
import ActionBar from '../../../../containers/Layout/ActionBar';
import HideableButton from '../../../Icons/HideableButton';
import routes from '../../../../lib/routes';

function MajorInfoActionBar({ id, adminOrMajorAdmin }) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const contactButton = (
      <HideableButton to={routes.majorEdit(id)} icon="edit">
        <FormattedMessage id="majors.edit" />
      </HideableButton>
    );

    actions.push(contactButton);
  }

  return <ActionBar actions={actions} />;
}

MajorInfoActionBar.propTypes = {
  id: PropTypes.number.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
};

export default withAuthorization(MajorInfoActionBar);
