import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import pick from 'lodash/pick';
import { update } from '../../../store/ducks/users';
import { loadMajors, getMajorEntities } from '../../../store/ducks/majors';
import ProfileEditForm from '../../../components/Profile/Edit/Form';

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

function mapStateToProps(state, ownProps) {
  const { currentUser } = ownProps;

  return {
    userId: currentUser.id,
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
  onSubmit: (values, dispatch, props) => dispatch(update(
    props.userId,
    processValues(values, props.currentUser),
  )),
})(ProfileEditForm);

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(form));