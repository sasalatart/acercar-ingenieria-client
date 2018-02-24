import { connect } from 'react-redux';
import { getCurrentUserEntity } from '../store/ducks/sessions';
import {
  like,
  unlike,
  getResourceLikeLoading,
} from '../store/ducks/likes';
import LikeButton from '../components/LikeButton';

function mapStateToProps(state, ownProps) {
  return {
    currentUser: getCurrentUserEntity(state),
    likingOrUnliking: getResourceLikeLoading(state, ownProps),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { collectionName, resourceId } = ownProps;

  return {
    onLike: () => dispatch(like(collectionName, resourceId)),
    onUnlike: () => dispatch(unlike(collectionName, resourceId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LikeButton);

