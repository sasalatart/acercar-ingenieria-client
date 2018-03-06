import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import pick from 'lodash/pick';
import {
  createMajor,
  updateMajor,
} from '../../store/ducks/majors';
import MajorEditForm from '../../components/Major/Form';
import majorPlaceholder from '../../images/major.png';

const FIELDS = [
  'name', 'category', 'videoUrl', 'shortDescription', 'description',
];

function mapStateToProps(state, ownProps) {
  const { major } = ownProps;

  return {
    initialValues: major ? pick(major, FIELDS) : {},
    currentLogoURL: get(major, 'logo.medium', majorPlaceholder),
  };
}

const form = reduxForm({
  form: 'major',
  onSubmit: (values, dispatch, props) => (props.major
    ? dispatch(updateMajor(props.major.id, values))
    : dispatch(createMajor(values))),
})(MajorEditForm);

export default injectIntl(connect(mapStateToProps)(form));

