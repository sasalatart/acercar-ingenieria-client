import { connect } from 'react-redux';
import {
  collection,
  loadDiscussion,
  getDiscussionEntity,
} from '../../../store/ducks/discussions';
import { getIsFetching } from '../../../store/ducks/loading';
import WithLoadableResource from '../../../hoc/WithLoadableResource';
import Discussion from '../../../components/Discussions/Discussion';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const discussion = getDiscussionEntity(state, params);

  return {
    loading: !discussion && getIsFetching(state, params),
    discussion,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps.match.params;

  return {
    loadDiscussion: () => dispatch(loadDiscussion(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadableResource('loadDiscussion', 'discussion')(Discussion));
