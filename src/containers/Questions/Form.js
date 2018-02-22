import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import pick from 'lodash/pick';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import {
  createQuestion,
  updateQuestion,
  getQuestionEntity,
} from '../../store/ducks/questions';
import QuestionsForm from '../../components/Questions/Form';

const FIELDS = ['question', 'answer', 'pinned'];

function mapStateToProps(state, ownProps) {
  const initialValues = ownProps.id
    ? pick(getQuestionEntity(state, { questionId: ownProps.id }), FIELDS)
    : {};

  return {
    initialValues,
    currentUser: getCurrentUserEntity(state),
  };
}

const form = reduxForm({
  form: 'question',
  onSubmit: (values, dispatch, props) => {
    const actionCreator = props.id ? updateQuestion : createQuestion;
    return dispatch(actionCreator(values, props.majorId, props.id))
      .then(() => props.onSubmitSuccess && props.onSubmitSuccess());
  },
})(QuestionsForm);

export default injectIntl(connect(mapStateToProps)(form));
