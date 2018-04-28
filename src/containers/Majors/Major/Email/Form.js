import { reduxForm } from 'redux-form';
import { sendEmail } from '../../../../store/ducks/majors';
import I18nForm from '../../../../hoc/I18nForm';
import { htmlFromContent } from '../../../../components/Forms/RichTextInput';
import EmailForm from '../../../../components/Majors/Major/Email/Form';
import emailValidations from '../../../../validations/email';

function processValues(values) {
  return { ...values, body: htmlFromContent(values.body) };
}

const form = reduxForm({
  form: 'email',
  onSubmit: (values, dispatch, props) =>
    dispatch(sendEmail(props.majorId, processValues(values), props.personal)),
})(EmailForm);

export default I18nForm(form, emailValidations);
