import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withAuthorization from '../../../hoc/withAuthorization';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../Icons/HideableButton';
import routes from '../../../lib/routes';

function MajorsActionBar({ admin }) {
  const actions = [];

  if (admin) {
    const buttonLink = (
      <HideableButton to={routes.majorsNew} icon="plus">
        <FormattedMessage id="majors.new" />
      </HideableButton>
    );

    actions.push(buttonLink);
  }

  return <ActionBar actions={actions} />;
}

MajorsActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
};

export default withAuthorization(MajorsActionBar);
