import { reduxForm } from 'redux-form';
import { recoverPassword } from '../../../store/ducks/sessions';
import I18nForm from '../../../hoc/I18nForm';
import Form from '../../../components/Auth/RecoverPassword/Form';
import usersValidations from '../../../validations/users';

const form = reduxForm({
  form: 'recoverPassword',
  onSubmit: (values, dispatch) => dispatch(recoverPassword(values)),
})(Form);

export default I18nForm(usersValidations)(form);
