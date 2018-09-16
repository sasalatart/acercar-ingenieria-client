import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../../../hoc/withAuthorization';
import ActionBar from '../../../containers/Layout/ActionBar';
import ToggleSubscriptionButton from '../../../containers/Majors/Major/ToggleSubscriptionButton';
import Title from '../../Layout/Title';
import SubTitle from '../../Layout/SubTitle';

function MajorHeader({
  loggedIn,
  majorId,
  majorName,
  subtitle,
  actions,
}) {
  const finalActions = loggedIn
    ? [...actions, <ToggleSubscriptionButton key="toggleSubscription" majorId={majorId} />]
    : actions;

  return (
    <Fragment>
      <ActionBar actions={finalActions} />
      <Title>{majorName}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Fragment>
  );
}

MajorHeader.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  majorId: PropTypes.number.isRequired,
  majorName: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  actions: PropTypes.arrayOf(PropTypes.node),
};

MajorHeader.defaultProps = {
  actions: [],
};

export default withAuthorization(MajorHeader);
