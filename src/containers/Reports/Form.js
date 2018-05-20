import { reduxForm } from 'redux-form';
import { report } from '../../store/ducks/reports';
import I18nForm from '../../hoc/I18nForm';
import { htmlFromContent } from '../../components/Forms/RichTextInput';
import ReportForm from '../../components/Reports/Form';
import emailValidations from '../../validations/email';

function processValues(values) {
  return { ...values, body: htmlFromContent(values.body) };
}

const form = reduxForm({
  form: 'report',
  onSubmit: (values, dispatch, props) =>
    dispatch(report(props.id, props.collection, processValues(values)))
      .then(() => props.callback()),
})(ReportForm);

export default I18nForm(form, emailValidations);
