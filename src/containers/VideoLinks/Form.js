import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import {
  createVideoLink,
  updateVideoLink,
  getVideoLinkEntity,
} from '../../store/ducks/video-links';
import I18nForm from '../../hoc/I18nForm';
import VideoLinksForm from '../../components/VideoLinks/Form';
import videoLinksValidations from '../../validations/video-links';

const FIELDS = ['title', 'url', 'pinned'];

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.id
      ? pick(getVideoLinkEntity(state, { videoLinkId: ownProps.id }), FIELDS)
      : {},
  };
}

const form = reduxForm({
  form: 'video',
  onSubmit: (values, dispatch, ownProps) => {
    const {
      id, baseResourceName, baseResourceId, onSubmitSuccess,
    } = ownProps;

    const action = id
      ? updateVideoLink(id, values, baseResourceName, baseResourceId)
      : createVideoLink(values, baseResourceName, baseResourceId);

    return dispatch(action)
      .then(() => onSubmitSuccess && onSubmitSuccess());
  },
})(VideoLinksForm);

const component = connect(mapStateToProps)(form);
export default I18nForm(component, videoLinksValidations);
