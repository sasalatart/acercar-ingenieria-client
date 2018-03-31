import { reduxForm } from 'redux-form';
import { signIn } from '../../../store/ducks/sessions';
import I18nForm from '../../../hoc/I18nForm';
import SignInForm from '../../../components/Auth/SignIn/Form';
import usersValidations from '../../../validations/users';

const form = reduxForm({
  form: 'signIn',
  onSubmit: (values, dispatch) => dispatch(signIn(values)),
})(SignInForm);

export default I18nForm(form, usersValidations);
