import { connect } from 'react-redux';
import { replace as replaceRoute } from 'react-router-redux';
import { injectIntl } from 'react-intl';
import { getPathname } from '../../../store/ducks/routes';
import {
  collection,
  loadUser,
  getUserEntity,
} from '../../../store/ducks/users';
import { getCurrentUserEntity } from '../../../store/ducks/sessions';
import { getNotificationsCount } from '../../../store/ducks/notifications';
import { getIsFetching } from '../../../store/ducks/loading';
import Profile from '../../../components/Users/Profile';

function mapStateToProps(state, ownProps) {
  const currentUser = getCurrentUserEntity(state);
  const id = +ownProps.match.params.id || currentUser.id;
  const params = { collection, id };
  const user = getUserEntity(state, params);

  return {
    loading: !!id && !user && getIsFetching(state, params),
    user,
    id,
    notificationsCount: getNotificationsCount(state),
    activeMenuKey: getPathname(state),
  };
}

const mapDispatchToProps = {
  loadUser,
  replaceRoute,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    loadUser: () => dispatchProps.loadUser(stateProps.id),
  };
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Profile);

export default injectIntl(connectedComponent);
