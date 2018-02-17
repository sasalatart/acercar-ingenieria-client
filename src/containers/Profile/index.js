import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { loadUser, getUserEntity } from '../../store/ducks/users';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import { changeProfileTab } from '../../routes';
import Profile from '../../components/Profile';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;
  const currentUser = getCurrentUserEntity(state);
  const userId = +params.userId || currentUser.id;

  return {
    userId,
    user: getUserEntity(state, ({ userId })),
    currentUser,
  };
}

const mapDispatchToProps = {
  loadUser,
  changeProfileTab,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile));
