import { connect } from 'react-redux';
import noop from 'lodash/noop';
import { like, unlike, getIsTogglingLike } from '../../store/ducks/likes';
import withAuthorization from '../../hoc/withAuthorization';
import LikeButton from '../../components/FeedButtons/LikeButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getIsTogglingLike(state, ownProps),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  if (ownProps.disabled) return { onClick: noop };

  const { baseCollection, baseId, likedByCurrentUser } = ownProps;
  const onClickFn = likedByCurrentUser ? unlike : like;
  return {
    onClick: () => dispatch(onClickFn(baseCollection, baseId)),
  };
}

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(LikeButton));
