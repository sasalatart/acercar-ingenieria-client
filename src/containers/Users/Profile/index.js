import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToLanding } from '../../../store/ducks/routes';
import { loadUser, getUserEntity } from '../../../store/ducks/users';
import { getCurrentUserId } from '../../../store/ducks/sessions';
import { getNotificationsCount } from '../../../store/ducks/notifications';
import { getIsFetching } from '../../../store/ducks/loading';
import Profile from '../../../components/Users/Profile';
import collections from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const id = +ownProps.match.params.id || getCurrentUserId(state);
  const params = { collection: collections.users, id };
  const user = getUserEntity(state, params);
  const loading = !!id && !user && getIsFetching(state, params);

  return {
    loading,
    noData: !loading && !ownProps.mine && !user,
    user,
    id,
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

const component = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Profile);

export default injectIntl(component);
