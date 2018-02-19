import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadUser,
  getUserEntity,
} from '../../store/ducks/users';
import {
  setProfileTab,
  getCurrentUserEntity,
  getProfileTab,
} from '../../store/ducks/sessions';
import Profile from '../../components/Profile';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;
  const currentUser = getCurrentUserEntity(state);
  const userId = +params.userId || currentUser.id;

  return {
    userId,
    user: getUserEntity(state, ({ userId })),
    currentUser,
    activeTab: getProfileTab(state),
  };
}

const mapDispatchToProps = {
  loadUser,
  setProfileTab,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile));
