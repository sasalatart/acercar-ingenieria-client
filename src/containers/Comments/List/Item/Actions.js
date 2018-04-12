import { connect } from 'react-redux';
import { getCurrentUserEntity } from '../../../../store/ducks/sessions';
import WithAuthorization from '../../../../hoc/WithAuthorization';
import Actions from '../../../../components/Comments/List/Item/Actions';

function mapStateToProps(state, ownProps) {
  const currentUser = getCurrentUserEntity(state);

  return {
    isAuthor: currentUser.id === ownProps.comment.author.id,
  };
}

const connectedComponent = connect(mapStateToProps)(Actions);
export default WithAuthorization(connectedComponent);
