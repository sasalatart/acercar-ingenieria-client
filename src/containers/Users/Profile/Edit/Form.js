import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import {
  updateProfile,
  getCurrentUserEntity,
} from '../../../../store/ducks/sessions';
import {
  loadMajors,
  getMajorEntities,
} from '../../../../store/ducks/majors';
import I18nForm from '../../../../hoc/I18nForm';
import EditForm from '../../../../components/Users/Profile/Edit/Form';
import usersValidations from '../../../../validations/users';

const FIELDS = [
  'email', 'firstName', 'lastName', 'generation', 'bio', 'majorUsersAttributes',
];

function processValues(values, currentUser) {
  const rejectedMajors = currentUser.majorsOfInterest
    .filter(({ majorId }) => !values.majorUsersAttributes.includes(majorId))
    .map(({ id }) => ({ id, _destroy: true }));

  const currentMajorIds = currentUser.majorsOfInterest.map(({ majorId }) => majorId);
  const newMajors = values.majorUsersAttributes
    .filter(majorId => !currentMajorIds.includes(majorId))
    .map(majorId => ({ majorId }));

  return {
    ...values,
    majorUsersAttributes: [...newMajors, ...rejectedMajors],
  };
}

function mapStateToProps(state) {
  const currentUser = getCurrentUserEntity(state);

  return {
    currentUser,
    majors: getMajorEntities(state),
    initialValues: {
      ...pick(currentUser, FIELDS),
      majorUsersAttributes: currentUser.majorsOfInterest.map(({ majorId }) => majorId),
    },
    currentAvatarURL: currentUser.avatar && currentUser.avatar.medium,
  };
}

const mapDispatchToProps = { loadMajors };

const form = reduxForm({
  form: 'profileEdit',
  onSubmit: (values, dispatch, props) => dispatch(updateProfile(
    props.currentUser.id,
    processValues(values, props.currentUser),
  )),
})(EditForm);

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(form);
export default I18nForm(connectedComponent, usersValidations);
