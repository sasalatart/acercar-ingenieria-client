import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import { createVideoLink, updateVideoLink, getVideoLinkEntity } from '../../store/ducks/video-links';
import I18nForm from '../../hoc/I18nForm';
import VideoLinksForm from '../../components/VideoLinks/Form';
import videoLinksValidations from '../../validations/video-links';

const FIELDS = ['title', 'url', 'pinned'];

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.id
      ? pick(getVideoLinkEntity(state, { id: ownProps.id }), FIELDS)
      : {},
  };
}

const form = reduxForm({
  form: 'video',
  onSubmit: (values, dispatch, ownProps) => {
    const { id, baseId, onSubmitSuccess } = ownProps;

    const action = id
      ? updateVideoLink(id, values)
      : createVideoLink(values, baseId);

    return dispatch(action)
      .then(() => onSubmitSuccess && onSubmitSuccess());
  },
})(VideoLinksForm);

export default compose(
  I18nForm(videoLinksValidations),
  connect(mapStateToProps),
)(form);
