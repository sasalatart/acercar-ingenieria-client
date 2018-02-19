import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { changePassword } from '../../../store/ducks/sessions';
import ChangePasswordForm from '../../../components/Profile/ChangePassword/Form';

const form = reduxForm({
  form: 'changePassword',
  onSubmit: (values, dispatch) => dispatch(changePassword(values)),
})(ChangePasswordForm);

export default injectIntl(form);
