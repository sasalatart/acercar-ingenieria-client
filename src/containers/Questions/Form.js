import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import {
  createQuestion,
  updateQuestion,
  getQuestionEntity,
} from '../../store/ducks/questions';
import withAuthorization from '../../hoc/withAuthorization';
import I18nForm from '../../hoc/I18nForm';
import QuestionsForm from '../../components/Questions/Form';
import questionsValidations from '../../validations/questions';

const FIELDS = ['question', 'answer', 'pinned'];

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.id
      ? pick(getQuestionEntity(state, ownProps), FIELDS)
      : {},
  };
}

const form = reduxForm({
  form: 'question',
  onSubmit: (values, dispatch, ownProps) => {
    const {
      adminOrMajorAdmin, id, majorId, onSubmitSuccess, match: { params: { unanswered } },
    } = ownProps;
    const shouldChangeRoute = adminOrMajorAdmin && !!unanswered === !!values.answer;
    const action = id
      ? updateQuestion(id, values, majorId, shouldChangeRoute)
      : createQuestion(values, majorId, shouldChangeRoute);

    return dispatch(action)
      .then(() => onSubmitSuccess && onSubmitSuccess());
  },
})(QuestionsForm);

export default compose(
  withAuthorization,
  I18nForm(questionsValidations),
  connect(mapStateToProps),
)(form);
