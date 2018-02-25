import { connect } from 'react-redux';
import noop from 'lodash/noop';
import { getCurrentUserEntity } from '../store/ducks/sessions';
import {
  like,
  unlike,
  getResourceLikeLoading,
} from '../store/ducks/likes';
import LikeButton from '../components/LikeButton';

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!getCurrentUserEntity(state),
    likingOrUnliking: getResourceLikeLoading(state, ownProps),
  };
}

const mapDispatchToProps = {
  like,
  unlike,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { collectionName, resourceId, likedByCurrentUser } = ownProps;

  const onClickFn = likedByCurrentUser ? dispatchProps.unlike : dispatchProps.like;

  return {
    ...ownProps,
    ...stateProps,
    onClick: stateProps.loggedIn ? () => onClickFn(collectionName, resourceId) : noop,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LikeButton);

