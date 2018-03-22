import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { sendEmail } from '../../../../store/ducks/majors';
import { htmlFromContent } from '../../../../components/Forms/RichTextInput';
import EmailForm from '../../../../components/Majors/Major/Email/Form';

function processValues(values) {
  return { ...values, content: htmlFromContent(values.content) };
}

export default injectIntl(reduxForm({
  form: 'email',
  onSubmit: (values, dispatch, props) =>
    dispatch(sendEmail(props.majorId, processValues(values))),
})(EmailForm));
