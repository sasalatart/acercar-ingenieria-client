import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import { createQuestion } from '../../store/ducks/questions';
import QuestionsForm from '../../components/Questions/Form';

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUserEntity(state),
  };
}

const form = reduxForm({
  form: 'question',
  onSubmit: (values, dispatch, props) =>
    dispatch(createQuestion(values, props.majorId))
      .then(() => props.onSubmitSuccess && props.onSubmitSuccess()),
})(QuestionsForm);

export default injectIntl(connect(mapStateToProps)(form));
