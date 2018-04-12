import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import {
  createQuestion,
  updateQuestion,
  getQuestionEntity,
} from '../../store/ducks/questions';
import WithAuthorization from '../../hoc/WithAuthorization';
import I18nForm from '../../hoc/I18nForm';
import QuestionsForm from '../../components/Questions/Form';
import questionsValidations from '../../validations/questions';

const FIELDS = ['question', 'answer', 'pinned'];

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.id
      ? pick(getQuestionEntity(state, { questionId: ownProps.id }), FIELDS)
      : {},
  };
}

const form = reduxForm({
  form: 'question',
  onSubmit: (values, dispatch, ownProps) => {
    const { id, majorId, onSubmitSuccess } = ownProps;
    const fromAnsweredRoute = !ownProps.match.params.pending;

    const action = id
      ? updateQuestion(id, values, majorId)
      : createQuestion(values, majorId, fromAnsweredRoute === !!values.answer);

    return dispatch(action)
      .then(() => onSubmitSuccess && onSubmitSuccess());
  },
})(QuestionsForm);

const connectedComponent = connect(mapStateToProps)(form);
export default WithAuthorization(I18nForm(connectedComponent, questionsValidations));
