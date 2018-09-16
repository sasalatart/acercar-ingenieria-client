import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getCurrentUserEntity } from '../../../store/ducks/sessions';
import { toggleSubscription, getIsSubscribing, getIsUnsubscribing } from '../../../store/ducks/majors';
import withAuthorization from '../../../hoc/withAuthorization';
import ToggleLoadingButton from '../../../components/Layout/ToggleLoadingButton';

function mapStateToProps(state, ownProps) {
  const { id, majorsOfInterest } = getCurrentUserEntity(state);
  const active = majorsOfInterest.some(({ majorId }) => majorId === ownProps.majorId);
  const props = { baseId: ownProps.majorId, id };
  return {
    id,
    active,
    content: <FormattedMessage id={active ? 'majors.unsubscribe' : 'majors.subscribe'} />,
    icon: active ? 'minus' : 'plus',
    loading: getIsSubscribing(state, props) || getIsUnsubscribing(state, props),
  };
}

const mapDispatchToProps = {
  toggleSubscription,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { id, active } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onClick: () => dispatchProps.toggleSubscription(ownProps.majorId, !active, id),
  };
}

export default compose(
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
)(ToggleLoadingButton);
