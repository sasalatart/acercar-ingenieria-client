import { connect } from 'react-redux';
import noop from 'lodash/noop';
import {
  suffix,
  like,
  unlike,
} from '../store/ducks/likes';
import {
  getIsCreating,
  getIsDestroying,
} from '../store/ducks/loading';
import WithAuthorization from '../hoc/WithAuthorization';
import LikeButton from '../components/LikeButton';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps, suffix };

  return {
    loading: getIsCreating(state, params) || getIsDestroying(state, params),
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
