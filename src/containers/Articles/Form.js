import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
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

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const id = +params.id;
  const majorId = +params.majorId;

  const article = getArticleEntity(state, params);
  const majorOptions = getMajorOptions(state);
  const categoryOptions = getCategoryOptions(state);
  const loading = (id && getIsFetching(state, params))
    || !majorOptions.length
    || !categoryOptions.length;

  return {
    id,
    loading,
    initialValues: id ? omitBy(pick(article, FIELDS), isNil) : { majorId },
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
    const { id } = props.match.params;

    const processedValues = processValues(values);
    const action = id
      ? updateArticle(id, processedValues, processedValues.majorId)
      : createArticle(processedValues, processedValues.majorId);

    return dispatch(action);
  },
})(ArticleForm);

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(form);
export default I18nForm(connectedComponent, articlesValidations);
