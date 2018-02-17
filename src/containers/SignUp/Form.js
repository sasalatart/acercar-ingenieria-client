import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { signUp } from '../../store/ducks/sessions';
import SignUpForm from '../../components/SignUp/Form';

const form = reduxForm({
  form: 'signUp',
  onSubmit: (values, dispatch) => dispatch(signUp(values)),
})(SignUpForm);

export default injectIntl(form);
