import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  getCurrentUserEntity,
  getHasAdminPrivileges,
} from '../../store/ducks/sessions';
import Comment from '../../components/Comments/Comment';

function mapStateToProps(state, ownProps) {
  const currentUser = getCurrentUserEntity(state);

  return {
    isAuthor: currentUser.id === ownProps.comment.author.id,
    hasAdminPrivileges: getHasAdminPrivileges(state, ownProps.match.params),
  };
}

export default withRouter(injectIntl(connect(mapStateToProps)(Comment)));
