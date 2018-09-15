import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import get from 'lodash/get';
import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import {
  loadDiscussion,
  createDiscussion,
  updateDiscussion,
  getDiscussionEntity,
  getIsLoadingDiscussion,
} from '../../store/ducks/discussions';
import withAuthorization from '../../hoc/withAuthorization';
import I18nForm from '../../hoc/I18nForm';
import DiscussionForm from '../../components/Discussions/Form';
import discussionsValidations from '../../validations/discussions';
import { processAttachableFormValues } from '../../lib/attachments';

const FIELDS = [
  'title', 'pinned', 'description', 'tagList',
];

function getInitialValues(id, discussion) {
  if (!id) return {};

  return {
    ...omitBy(pick(discussion, FIELDS), isNil),
    tagList: discussion.tagList && discussion.tagList.join(', '),
  };
}

function mapStateToProps(state, { match: { params } }) {
  const id = params.id && +params.id;
  const discussion = getDiscussionEntity(state, params);
  const loading = !!id && !discussion && getIsLoadingDiscussion(state, params);

  return {
    id,
    loading,
    noData: !!id && !discussion && !loading,
    initialValues: getInitialValues(id, discussion),
    previousAttachments: get(discussion, 'attachments', []),
  };
}

function mapDispatchToProps(dispatch, { match: { params: { id } } }) {
  return {
    loadDiscussion: () => dispatch(loadDiscussion(id)),
  };
}

const form = reduxForm({
  form: 'discussion',
  onSubmit: (values, dispatch, props) => {
    const { id } = props.match.params;
    const finalValues = processAttachableFormValues(values);

    const action = id
      ? updateDiscussion(id, finalValues)
      : createDiscussion(finalValues);

    return dispatch(action);
  },
})(DiscussionForm);

export default compose(
  withAuthorization,
  I18nForm(discussionsValidations),
  connect(mapStateToProps, mapDispatchToProps),
)(form);
