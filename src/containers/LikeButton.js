import { connect } from 'react-redux';
import noop from 'lodash/noop';
import { like, unlike } from '../store/ducks/likes';
import {
  getIsCreating,
  getIsDestroying,
} from '../store/ducks/loading';
import WithAuthorization from '../hoc/WithAuthorization';
import LikeButton from '../components/LikeButton';
import { likesCollection as collection } from '../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps, collection };

  return {
    loading: getIsCreating(state, params) || getIsDestroying(state, params),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { baseResourceName, baseResourceId, likedByCurrentUser } = ownProps;

  const onClickFn = likedByCurrentUser ? unlike : like;
  return {
    onClick: ownProps.loggedIn ? () => dispatch(onClickFn(baseResourceName, baseResourceId)) : noop,
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(LikeButton);
export default WithAuthorization(connectedComponent);
