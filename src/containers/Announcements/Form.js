import { reduxForm } from 'redux-form';
import { createAnnouncement } from '../../store/ducks/announcements';
import I18nForm from '../../hoc/I18nForm';
import AnnouncementForm from '../../components/Announcements/Form';
import announcementsValidations from '../../validations/announcements';

const form = reduxForm({
  form: 'announcement',
  onSubmit: (values, dispatch, props) => dispatch(createAnnouncement(values))
    .then(() => props.onSubmitSuccess && props.onSubmitSuccess()),
})(AnnouncementForm);

export default I18nForm(announcementsValidations)(form);
