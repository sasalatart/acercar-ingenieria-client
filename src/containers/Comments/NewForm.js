import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { createComment } from '../../store/ducks/comments';
import CommentForm from '../../components/Comments/Form';

function mapStateToProps(state, ownProps) {
  const { parentCommentId } = ownProps;

  return {
    form: parentCommentId ? `commentAnswer${parentCommentId}` : 'commentNew',
    initialValues: { parentCommentId: ownProps.parentCommentId },
  };
}

const form = reduxForm({
  onSubmit: (values, dispatch, { baseResourceName, baseResourceId }) =>
    dispatch(createComment(values, baseResourceName, baseResourceId)),
})(CommentForm);

export default injectIntl(connect(mapStateToProps)(form));
