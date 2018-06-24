import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import get from 'lodash/get';
import pick from 'lodash/pick';
import {
  createMajor,
  updateMajor,
} from '../../store/ducks/majors';
import I18nForm from '../../hoc/I18nForm';
import Form from '../../components/Majors/Form';
import majorsValidations from '../../validations/majors';
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
})(Form);

const component = connect(mapStateToProps)(form);
export default I18nForm(component, majorsValidations);

