import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import pick from 'lodash/pick';
import { updateMajor } from '../../store/ducks/majors';
import MajorEditForm from '../../components/Major/Form';

const FIELDS = [
  'name', 'category', 'videoUrl', 'shortDescription', 'description',
];

function mapStateToProps(state, ownProps) {
  const { major } = ownProps;

  return {
    initialValues: pick(major, FIELDS),
    currentLogoURL: major.logo && major.logo.medium,
  };
}

const form = reduxForm({
  form: 'major',
  onSubmit: (values, dispatch, props) => dispatch(updateMajor(props.major.id, values)),
})(MajorEditForm);

export default injectIntl(connect(mapStateToProps)(form));

