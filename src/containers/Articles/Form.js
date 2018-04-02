import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import get from 'lodash/get';
import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import {
  loadMajors,
  getCurrentUserMajorOptions,
} from '../../store/ducks/majors';
import {
  loadCategories,
  getCategoryOptions,
} from '../../store/ducks/categories';
import {
  collection,
  createArticle,
  updateArticle,
  getArticleEntity,
} from '../../store/ducks/articles';
import { getIsFetching } from '../../store/ducks/loading';
import articlePlaceholder from '../../images/article.png';
import I18nForm from '../../hoc/I18nForm';
import ArticleForm from '../../components/Articles/Form';
import articlesValidations from '../../validations/articles';

const FIELDS = [
  'title', 'shortDescription', 'content', 'categoryList', 'majorId',
];

function getInitialValues(id, majorId, article) {
  if (!id) return { majorId };

  return {
    ...omitBy(pick(article, FIELDS), isNil),
    categoryList: article.categoryList && article.categoryList.join(', '),
  };
}

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const id = params.id && +params.id;
  const majorId = params.majorId && +params.majorId;

  const article = getArticleEntity(state, params);
  const majorOptions = getCurrentUserMajorOptions(state);
  const categoryOptions = getCategoryOptions(state);
  const loading = (id && getIsFetching(state, params)) || !categoryOptions.length;

  return {
    id,
    loading,
    initialValues: getInitialValues(id, majorId, article),
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

const form = reduxForm({
  form: 'article',
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    const { id } = props.match.params;

    const action = id
      ? updateArticle(id, values, values.majorId)
      : createArticle(values, values.majorId);

    return dispatch(action);
  },
})(ArticleForm);

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(form);
export default I18nForm(connectedComponent, articlesValidations);
