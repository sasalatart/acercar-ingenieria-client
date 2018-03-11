import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getIsLoggedIn,
  getIsAdmin,
  getIsAdminOrMajorAdmin,
} from '../store/ducks/sessions';

export default function HOC(WrappedComponent) {
  function mapStateToProps(state, ownProps) {
    const majorId = +(ownProps.match.params.majorId || ownProps.majorId);

    return {
      loggedIn: getIsLoggedIn(state),
      admin: getIsAdmin(state),
      adminOrMajorAdmin: getIsAdminOrMajorAdmin(state, { majorId }),
    };
  }

  function WithAuthorization(props) {
    return <WrappedComponent {...props} />;
  }

  return withRouter(connect(mapStateToProps)(WithAuthorization));
}
