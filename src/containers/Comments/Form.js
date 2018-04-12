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

const FIELDS = ['content'];

function getFormName(comment) {
  if (comment && comment.commentableType === 'Comment') {
    return `commentAnswer${comment.commentableId}`;
  }

  return comment ? `commentEdit${comment.id}` : 'commentNew';
}

function mapStateToProps(state, { comment }) {
  return {
    form: getFormName(comment),
    initialValues: comment
      ? pick(comment, FIELDS)
      : {},
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
