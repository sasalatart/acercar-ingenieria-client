import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import WithAuthorization from '../../hoc/WithAuthorization';
import Comment from '../../components/Comments/Comment';

function mapStateToProps(state, ownProps) {
  const currentUser = getCurrentUserEntity(state);

  return {
    isAuthor: currentUser.id === ownProps.comment.author.id,
  };
}

export default injectIntl(WithAuthorization(connect(mapStateToProps)(Comment)));
