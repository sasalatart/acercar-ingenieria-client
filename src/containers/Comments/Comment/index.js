import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  collection,
  loadComment,
  getCommentEntity,
} from '../../../store/ducks/comments';
import { getIsFetching } from '../../../store/ducks/loading';
import Comment from '../../../components/Comments/Comment';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const comment = getCommentEntity(state, params);

  return {
    loading: !comment && getIsFetching(state, params),
    comment,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { params } = ownProps.match;

  const baseResourceKey = Object.keys(params).find(key => /Id/.test(key));
  const baseResourceName = baseResourceKey && baseResourceKey.replace('Id', 's');
  const baseResourceId = baseResourceKey && params[baseResourceKey];

  return {
    loadComment: () => dispatch(loadComment(params.id, baseResourceName, baseResourceId)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Comment);
export default injectIntl(connectedComponent);
