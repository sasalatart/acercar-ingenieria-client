import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import get from 'lodash/get';
import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import { getMajorOptionsForCurrentUser } from '../../store/ducks/sessions';
import { loadMajors } from '../../store/ducks/majors';
import { loadCategories, getCategoryOptions } from '../../store/ducks/categories';
import {
  createArticle,
  updateArticle,
  getArticleEntity,
  getMajorOptionsForArticle,
  getIsLoadingArticle,
} from '../../store/ducks/articles';
import withAuthorization from '../../hoc/withAuthorization';
import I18nForm from '../../hoc/I18nForm';
import ArticleForm from '../../components/Articles/Form';
import articlesValidations from '../../validations/articles';
import { processAttachableFormValues } from '../../lib/attachments';
import articlePlaceholder from '../../images/article.png';

const FIELDS = [
  'title', 'shortDescription', 'content', 'categoryList',
];

function getInitialValues(id, majorId, article) {
  if (!id) return { majorId };

  return {
    ...omitBy(pick(article, FIELDS), isNil),
    majorId,
    categoryList: article && article.categoryList && article.categoryList.join(', '),
  };
}

function mapStateToProps(state, { match }) {
  const id = match.params.id && +match.params.id;
  const majorId = match.params.majorId && +match.params.majorId;

  const params = { id, baseId: majorId };

  const article = getArticleEntity(state, params);
  const majorOptions = article
    ? getMajorOptionsForArticle(state, params)
    : getMajorOptionsForCurrentUser(state);
  const categoryOptions = getCategoryOptions(state);
  const loading = (id && getIsLoadingArticle(state, params)) || !categoryOptions.length;

  return {
    id,
    loading,
    noData: !loading && !!params.id && !article,
    initialValues: getInitialValues(id, majorId, article),
    majorOptions,
    categoryOptions,
    currentPreviewURL: get(article, 'previewUrl') || articlePlaceholder,
    previousAttachments: get(article, 'attachments', []),
  };
}

const mapDispatchToProps = {
  loadMajors,
  loadCategories,
};

const form = reduxForm({
  form: 'article',
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    const { id } = props.match.params;
    const finalValues = processAttachableFormValues(values);

    const action = id
      ? updateArticle(id, finalValues, finalValues.majorId)
      : createArticle(finalValues, finalValues.majorId);

    return dispatch(action);
  },
})(ArticleForm);

export default compose(
  withAuthorization,
  I18nForm(articlesValidations),
  connect(mapStateToProps, mapDispatchToProps),
)(form);
