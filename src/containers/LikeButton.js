import { connect } from 'react-redux';
import noop from 'lodash/noop';
import {
  like,
  unlike,
  getResourceLikeLoading,
} from '../store/ducks/likes';
import WithAuthorization from '../hoc/WithAuthorization';
import LikeButton from '../components/LikeButton';

function mapStateToProps(state, ownProps) {
  return {
    likingOrUnliking: getResourceLikeLoading(state, ownProps),
  };
}

const mapDispatchToProps = {
  like,
  unlike,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { collection, id, likedByCurrentUser } = ownProps;

  const onClickFn = likedByCurrentUser ? dispatchProps.unlike : dispatchProps.like;

  return {
    ...ownProps,
    ...stateProps,
    onClick: ownProps.loggedIn ? () => onClickFn(collection, id) : noop,
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(LikeButton);
export default WithAuthorization(connectedComponent);
