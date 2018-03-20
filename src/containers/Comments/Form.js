import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import {
  createComment,
  updateComment,
} from '../../store/ducks/comments';
import I18nForm from '../../hoc/I18nForm';
import CommentForm from '../../components/Comments/Form';
import commentsValidations from '../../validations/comments';

const FIELDS = [
  'content', 'parentCommentId',
];

function getFormName(parentCommentId, comment) {
  if (parentCommentId) return `commentAnswer${parentCommentId}`;

  return comment ? `commentEdit${comment.id}` : 'commentNew';
}

function mapStateToProps(state, ownProps) {
  const { parentCommentId, comment } = ownProps;

  return {
    form: getFormName(parentCommentId, comment),
    initialValues: comment
      ? pick(comment, FIELDS)
      : { parentCommentId },
  };
}

const form = reduxForm({
  onSubmit: (values, dispatch, props) => {
    const { baseResourceName, baseResourceId, comment } = props;

    const action = comment
      ? updateComment(comment.id, values, baseResourceName, baseResourceId)
      : createComment(values, baseResourceName, baseResourceId);

    return dispatch(action).then(() => props.onSubmitSuccess && props.onSubmitSuccess());
  },
})(CommentForm);

const connectedComponent = connect(mapStateToProps)(form);
export default I18nForm(connectedComponent, commentsValidations);
