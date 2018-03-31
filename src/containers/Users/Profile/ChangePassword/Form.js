import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getTokensFromSearch } from '../../../../store/ducks/routes';
import { changePassword } from '../../../../store/ducks/sessions';
import I18nForm from '../../../../hoc/I18nForm';
import Form from '../../../../components/Users/Profile/ChangePassword/Form';
import usersValidations from '../../../../validations/users';

function mapStateToProps(state) {
  return {
    tokens: getTokensFromSearch(state),
  };
}

const form = reduxForm({
  form: 'changePassword',
  onSubmit: (values, dispatch, ownProps) => dispatch(changePassword(values, ownProps.tokens)),
})(Form);

const connectedComponent = connect(mapStateToProps)(form);
export default I18nForm(connectedComponent, usersValidations);
