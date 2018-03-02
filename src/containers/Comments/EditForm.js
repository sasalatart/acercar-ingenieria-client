import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import pick from 'lodash/pick';
import { updateComment } from '../../store/ducks/comments';
import CommentForm from '../../components/Comments/Form';

const FIELDS = [
  'content', 'parentCommentId',
];

function mapStateToProps(state, ownProps) {
  const { comment } = ownProps;

  return {
    form: `commentEdit${comment.id}`,
    initialValues: pick(comment, FIELDS),
  };
}

const form = reduxForm({
  onSubmit: (values, dispatch, props) => {
    const { id, commentableType, commentableId } = props.comment;
    const baseResourceName = `${commentableType.toLowerCase()}s`;
    return dispatch(updateComment(id, values, baseResourceName, commentableId))
      .then(props.onSubmitSuccess && props.onSubmitSuccess());
  },
})(CommentForm);

export default injectIntl(connect(mapStateToProps)(form));
