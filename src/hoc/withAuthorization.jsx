import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getIsLoggedIn,
  getIsAdmin,
  getIsAdminOrMajorAdmin,
} from '../store/ducks/sessions';
import { getMajorIdFromProps } from '../store/ducks/majors';

export default function HOC(WrappedComponent) {
  function mapStateToProps(state, ownProps) {
    const params = { majorId: getMajorIdFromProps(ownProps) };

    return {
      loggedIn: getIsLoggedIn(state),
      admin: getIsAdmin(state),
      adminOrMajorAdmin: getIsAdminOrMajorAdmin(state, params),
    };
  }

  function WithAuthorization(props) {
    return <WrappedComponent {...props} />;
  }

  return withRouter(connect(mapStateToProps)(WithAuthorization));
}
