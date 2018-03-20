import { reduxForm } from 'redux-form';
import { signUp } from '../../store/ducks/sessions';
import I18nForm from '../../hoc/I18nForm';
import SignUpForm from '../../components/SignUp/Form';
import usersValidations from '../../validations/users';

const form = reduxForm({
  form: 'signUp',
  onSubmit: (values, dispatch) => dispatch(signUp(values)),
})(SignUpForm);

export default I18nForm(form, usersValidations);
