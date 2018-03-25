import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import get from 'lodash/get';
import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import {
  collection,
  loadDiscussion,
  createDiscussion,
  updateDiscussion,
  getDiscussionEntity,
} from '../../store/ducks/discussions';
import { getIsFetching } from '../../store/ducks/loading';
import withAuthorization from '../../hoc/WithAuthorization';
import I18nForm from '../../hoc/I18nForm';
import DiscussionForm from '../../components/Discussions/Form';
import discussionsValidations from '../../validations/discussions';

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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadDiscussion: () => dispatch(loadDiscussion(ownProps.match.params.id)),
  };
}

const form = reduxForm({
  form: 'discussion',
  onSubmit: (values, dispatch, props) => {
    const { id } = props.match.params;

    const action = id
      ? updateDiscussion(id, values)
      : createDiscussion(values);

    return dispatch(action);
  },
})(DiscussionForm);

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(form);
export default withAuthorization(I18nForm(connectedComponent, discussionsValidations));
