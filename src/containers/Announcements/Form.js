import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { createAnnouncement } from '../../store/ducks/announcements';
import AnnouncementForm from '../../components/Announcements/Form';

const form = reduxForm({
  form: 'announcement',
  onSubmit: (values, dispatch, props) => dispatch(createAnnouncement(values))
    .then(props.onSubmitSuccess && props.onSubmitSuccess()),
})(AnnouncementForm);

export default injectIntl(form);
