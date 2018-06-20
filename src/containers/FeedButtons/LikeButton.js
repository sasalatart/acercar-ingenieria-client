import { connect } from 'react-redux';
import noop from 'lodash/noop';
import { like, unlike } from '../../store/ducks/likes';
import { getIsCreating, getIsDestroying } from '../../store/ducks/loading';
import WithAuthorization from '../../hoc/WithAuthorization';
import LikeButton from '../../components/FeedButtons/LikeButton';
import collections from '../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps, collection: collections.likes };

  return {
    loading: !ownProps.disabled && (getIsCreating(state, params) || getIsDestroying(state, params)),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    baseResourceName, baseResourceId, likedByCurrentUser, disabled,
  } = ownProps;

  if (disabled) return { onClick: noop };

  const onClickFn = likedByCurrentUser ? unlike : like;
  return {
    onClick: () => dispatch(onClickFn(baseResourceName, baseResourceId)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(LikeButton);
export default WithAuthorization(connectedComponent);
