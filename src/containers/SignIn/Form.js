import { reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import { signIn } from '../../store/ducks/sessions';
import SignInForm from '../../components/SignIn/Form';

const form = reduxForm({
  form: 'signIn',
  onSubmit: (values, dispatch) => dispatch(signIn(values)),
})(SignInForm);

export default injectIntl(form);
