import { connect } from 'react-redux';
import { getCurrentUserId } from '../../store/ducks/sessions';
import { getMajorIdFromProps } from '../../store/ducks/majors';
import {
  loadArticle,
  getArticleEntity,
  getArticleIdFromProps,
} from '../../store/ducks/articles';
import { getIsFetching } from '../../store/ducks/loading';
import withAuthorization from '../../hoc/withAuthorization';
import withLoadableResource from '../../hoc/withLoadableResource';
import Restricted from '../../components/Routes/Restricted';
import { getCollectionParams } from '../../lib/articles';

function idsFromProps(ownProps) {
  return {
    id: getArticleIdFromProps(ownProps),
    majorId: getMajorIdFromProps(ownProps),
  };
}

function mapStateToProps(state, ownProps) {
  const { id, majorId } = idsFromProps(ownProps);
  const params = getCollectionParams(majorId, { id });
  const article = getArticleEntity(state, params);
  const isAuthor = article && getCurrentUserId(state) === article.author.id;

  return {
    loading: !article && getIsFetching(state, params),
    restrictedCondition: ownProps.adminOrMajorAdmin || isAuthor,
    article,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, majorId } = idsFromProps(ownProps);
  return {
    loadArticle: () => dispatch(loadArticle(id, majorId)),
  };
}

const component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadArticle', 'article')(Restricted));
export default withAuthorization(component);
