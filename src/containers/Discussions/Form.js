import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import {
  createDiscussion,
  updateDiscussion,
  getDiscussionEntity,
} from '../../store/ducks/discussions';
import withAuthorization from '../../hoc/WithAuthorization';
import DiscussionForm from '../../components/Discussions/Form';

const FIELDS = [
  'title', 'pinned', 'description', 'tagList',
];

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;
  const discussionId = params.discussionId && +params.discussionId;

  const discussion = getDiscussionEntity(state, params);

  return {
    discussionId,
    loading: !!discussionId && !discussion,
    initialValues: discussionId ? omitBy(pick(discussion, FIELDS), isNil) : {},
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
    const { discussionId } = props.match.params;

    const processedValues = processValues(values);
    const action = discussionId
      ? updateDiscussion(discussionId, processedValues)
      : createDiscussion(processedValues);

    return dispatch(action);
  },
})(DiscussionForm);

export default injectIntl(withAuthorization(connect(mapStateToProps)(form)));
