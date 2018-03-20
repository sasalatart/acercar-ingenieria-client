import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import {
  collection,
  createDiscussion,
  updateDiscussion,
  getDiscussionEntity,
} from '../../store/ducks/discussions';
import { getIsFetching } from '../../store/ducks/loading';
import withAuthorization from '../../hoc/WithAuthorization';
import DiscussionForm from '../../components/Discussions/Form';

const FIELDS = [
  'title', 'pinned', 'description', 'tagList',
];

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const id = params.id && +params.id;

  const discussion = getDiscussionEntity(state, params);
  const loading = !!id && !discussion && getIsFetching(state, params);

  return {
    id,
    loading,
    noData: !!id && !discussion && !loading,
    initialValues: id ? omitBy(pick(discussion, FIELDS), isNil) : {},
    previousAttachments: get(discussion, 'attachments', []),
  };
}

function processValues(values) {
  const tagList = values.tagList && values.tagList.reduce((tags, tag) => `${tags}, ${tag}`);

  return { ...values, tagList };
}

const form = reduxForm({
  form: 'discussion',
  onSubmit: (values, dispatch, props) => {
    const { id } = props.match.params;

    const processedValues = processValues(values);
    const action = id
      ? updateDiscussion(id, processedValues)
      : createDiscussion(processedValues);

    return dispatch(action);
  },
})(DiscussionForm);

export default injectIntl(withAuthorization(connect(mapStateToProps)(form)));
