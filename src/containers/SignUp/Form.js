import { reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import { signUp } from '../../store/ducks/sessions';
import SignUpForm from '../../components/SignUp/Form';

const form = reduxForm({
  form: 'signUp',
  onSubmit: (values, dispatch, props) => dispatch(signUp(values, props.intl.locale)),
})(SignUpForm);

export default injectIntl(form);
