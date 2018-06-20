import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import pick from 'lodash/pick';
import {
  createComment,
  updateComment,
} from '../../store/ducks/comments';
import I18nForm from '../../hoc/I18nForm';
import CommentForm from '../../components/Comments/Form';
import commentsValidations from '../../validations/comments';
import collections from '../../lib/collections';

const FIELDS = ['content'];

function getFormName(baseResourceName, baseResourceId, comment) {
  if (comment) {
    return `commentEdit${comment.id}`;
  }

  return baseResourceName === collections.comments
    ? `commentAnswer${baseResourceId}`
    : 'commentNew';
}

function mapStateToProps(state, { baseResourceName, baseResourceId, comment }) {
  return {
    form: getFormName(baseResourceName, baseResourceId, comment),
    initialValues: comment ? pick(comment, FIELDS) : {},
  };
}

const form = reduxForm({
  onSubmit: (values, dispatch, props) => {
    const {
      form: formName, baseResourceName, baseResourceId, comment, reverseList,
    } = props;

    const action = comment
      ? updateComment(comment.id, values, baseResourceName, baseResourceId)
      : createComment(values, baseResourceName, baseResourceId, reverseList);

    return dispatch(action).then(() => {
      if (!comment) dispatch(reset(formName));
      if (props.onSubmitSuccess) props.onSubmitSuccess();
    });
  },
})(CommentForm);

const connectedComponent = connect(mapStateToProps)(form);
export default I18nForm(connectedComponent, commentsValidations);
