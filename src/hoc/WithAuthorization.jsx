import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getCurrentUserEntity,
  getHasAdminPrivileges,
} from '../store/ducks/sessions';

export default function HOC(WrappedComponent) {
  function mapStateToProps(state, ownProps) {
    const majorId = +ownProps.match.params.majorId || ownProps.majorId;

    return {
      loggedIn: !!getCurrentUserEntity(state),
      hasAdminPrivileges: getHasAdminPrivileges(state, { majorId }),
    };
  }

  function WithAuthorization(props) {
    return <WrappedComponent {...props} />;
  }

  return withRouter(connect(mapStateToProps)(WithAuthorization));
}
