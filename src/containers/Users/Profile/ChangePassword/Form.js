import { reduxForm } from 'redux-form';
import { changePassword } from '../../../../store/ducks/sessions';
import I18nForm from '../../../../hoc/I18nForm';
import Form from '../../../../components/Users/Profile/ChangePassword/Form';
import usersValidations from '../../../../validations/users';

const form = reduxForm({
  form: 'changePassword',
  onSubmit: (values, dispatch) => dispatch(changePassword(values)),
})(Form);

export default I18nForm(form, usersValidations);
