import { connect } from 'react-redux';
import { goToLanding } from '../../../store/ducks/routes';
import { loadUser, getUserEntity, getIsLoadingUser } from '../../../store/ducks/users';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import { getNotificationsCount } from '../../../store/ducks/notifications';
import Profile from '../../../components/Users/Profile';

function mapStateToProps(state, { match, mine }) {
  const id = +match.params.id || getCurrentUserId(state);
  const params = { id };
  const user = getUserEntity(state, params);
  const loading = !!id && !user && getIsLoadingUser(state, params);
  return {
    loading,
    noData: !loading && !mine && !user,
    id,
    user,
    notificationsCount: getNotificationsCount(state),
  };
}

const mapDispatchToProps = {
  loadUser,
  goToLanding,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    loadUser: () => dispatchProps.loadUser(stateProps.id),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Profile);
