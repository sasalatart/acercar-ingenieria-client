import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { loadUser, getUserEntity } from '../../store/ducks/users';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import Profile from '../../components/Profile';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;

  return {
    userId: +params.userId,
    user: getUserEntity(state, params),
    currentUser: getCurrentUserEntity(state),
  };
}

const mapDispatchToProps = {
  loadUser,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile));
