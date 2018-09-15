import { compose } from 'redux';
import { connect } from 'react-redux';
import { getIsAdmin, getCurrentUserId } from '../../store/ducks/sessions';
import { loadDiscussion, getDiscussionEntity, getIsLoadingDiscussion } from '../../store/ducks/discussions';
import { getPlaceholderFlags } from '../../store/ducks/shared';
import withLoadableResource from '../../hoc/withLoadableResource';
import Restricted from '../../components/Routes/Restricted';

function mapStateToProps(state, { match: { params } }) {
  const discussion = getDiscussionEntity(state, params);
  const isAuthor = discussion && getCurrentUserId(state) === discussion.author.id;
  return {
    ...getPlaceholderFlags(getIsLoadingDiscussion(state, params), discussion),
    restrictedCondition: getIsAdmin(state) || isAuthor,
    discussion,
  };
}

function mapDispatchToProps(dispatch, { match: { params: { id } } }) {
  return {
    loadDiscussion: () => dispatch(loadDiscussion(id)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLoadableResource('loadDiscussion', 'discussion'),
)(Restricted);
