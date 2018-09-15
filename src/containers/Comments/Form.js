import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import pick from 'lodash/pick';
import { createComment, updateComment } from '../../store/ducks/comments';
import I18nForm from '../../hoc/I18nForm';
import CommentForm from '../../components/Comments/Form';
import commentsValidations from '../../validations/comments';
import collections from '../../lib/collections';

const FIELDS = ['content'];

function getFormName(baseCollection, baseId, comment) {
  if (comment) {
    return `commentEdit${comment.id}`;
  }

  return baseCollection === collections.comments
    ? `commentAnswer${baseId}`
    : 'commentNew';
}

function mapStateToProps(state, { baseCollection, baseId, comment }) {
  return {
    form: getFormName(baseCollection, baseId, comment),
    initialValues: comment ? pick(comment, FIELDS) : {},
  };
}

const form = reduxForm({
  onSubmit: (values, dispatch, props) => {
    const {
      form: formName, baseCollection, baseId, comment, addToEnd,
    } = props;

    const action = comment
      ? updateComment(comment.id, values)
      : createComment(values, baseId, baseCollection, addToEnd);

    return dispatch(action).then(() => {
      if (!comment) dispatch(reset(formName));
      if (props.onSubmitSuccess) props.onSubmitSuccess();
    });
  },
})(CommentForm);

export default compose(
  I18nForm(commentsValidations),
  connect(mapStateToProps),
)(form);
