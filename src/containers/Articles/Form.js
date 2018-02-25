import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import {
  loadMajors,
  getMajorOptions,
} from '../../store/ducks/majors';
import {
  loadCategories,
  getCategoryOptions,
} from '../../store/ducks/categories';
import {
  loadArticle,
  createArticle,
  updateArticle,
  getArticleEntity,
} from '../../store/ducks/articles';
import articlePlaceholder from '../../images/article.png';
import ArticleForm from '../../components/Articles/Form';

const FIELDS = [
  'title', 'shortDescription', 'content', 'categoryList', 'majorId',
];

function mapStateToProps(state, ownProps) {
  const { articleId } = ownProps.match.params;
  const article = getArticleEntity(state, ownProps.match.params);

  return {
    articleId: +articleId,
    loading: !!articleId && !article,
    initialValues: articleId ? omitBy(pick(article, FIELDS), isNil) : {},
    majorOptions: getMajorOptions(state),
    categoryOptions: getCategoryOptions(state),
    currentPictureURL: get(article, 'picture.medium', articlePlaceholder),
    previousAttachments: get(article, 'attachments', []),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, articleId } = ownProps.match.params;

  const loadArticleFn = () => dispatch(loadArticle(articleId, majorId));

  return {
    loadArticle: articleId && loadArticleFn,
    loadMajors: () => dispatch(loadMajors()),
    loadCategories: () => dispatch(loadCategories()),
  };
}

function processValues(values) {
  const categoryList = values.categoryList
    && values.categoryList.reduce((categories, category) => `${categories}, ${category}`);

  return { ...values, categoryList };
}

const form = reduxForm({
  form: 'article',
  onSubmit: (values, dispatch, props) => {
    const { articleId } = props.match.params;

    const processedValues = processValues(values);
    const action = articleId
      ? updateArticle(processedValues, articleId, processedValues.majorId)
      : createArticle(processedValues, articleId);

    return dispatch(action);
  },
})(ArticleForm);

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(form));
