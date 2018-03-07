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
  const { params } = ownProps.match;
  const articleId = +params.articleId;
  const majorId = +params.majorId;

  const article = getArticleEntity(state, params);
  const majorOptions = getMajorOptions(state);
  const categoryOptions = getCategoryOptions(state);
  const loading = (!!articleId && !article) || !majorOptions.length || !categoryOptions.length;

  return {
    articleId,
    loading,
    initialValues: articleId ? omitBy(pick(article, FIELDS), isNil) : { majorId },
    majorOptions,
    categoryOptions,
    currentPictureURL: get(article, 'picture.medium', articlePlaceholder),
    previousAttachments: get(article, 'attachments', []),
  };
}

const mapDispatchToProps = {
  loadMajors,
  loadCategories,
};

function processValues(values) {
  const categoryList = values.categoryList
    && values.categoryList.reduce((categories, category) => `${categories}, ${category}`);

  return { ...values, categoryList };
}

const form = reduxForm({
  form: 'article',
  enableReinitialize: true,
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
