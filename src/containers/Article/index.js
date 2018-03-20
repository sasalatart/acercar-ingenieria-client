import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  collection,
  loadArticle,
  getArticleEntity,
} from '../../store/ducks/articles';
import { getIsFetching } from '../../store/ducks/loading';
import WithAuthorization from '../../hoc/WithAuthorization';
import Article from '../../components/Article/index';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const article = getArticleEntity(state, params);

  return {
    loading: !article && getIsFetching(state, params),
    article,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, majorId } = ownProps.match.params;

  return {
    loadArticle: () => dispatch(loadArticle(id, majorId)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Article);
export default injectIntl(WithAuthorization(connectedComponent));
