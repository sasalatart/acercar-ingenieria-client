import { connect } from 'react-redux';
import { replace as replaceRoute } from 'react-router-redux';
import { injectIntl } from 'react-intl';
import { getPathname } from '../../store/ducks/routes';
import {
  loadUser,
  getUserEntity,
} from '../../store/ducks/users';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import Profile from '../../components/Profile';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;
  const currentUser = getCurrentUserEntity(state);
  const userId = +params.userId || currentUser.id;

  return {
    userId,
    user: getUserEntity(state, ({ userId })),
    currentUser,
    activeMenuKey: getPathname(state),
  };
}

const mapDispatchToProps = {
  loadUser,
  replaceRoute,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile));
