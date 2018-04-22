import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import {
  createCredit,
  updateCredit,
  getCreditEntity,
} from '../../store/ducks/credits';
import I18nForm from '../../hoc/I18nForm';
import CreditsForm from '../../components/Credits/Form';
import creditsValidations from '../../validations/credits';

const FIELDS = ['resourceName', 'resourceUrl', 'authorName'];

function mapStateToProps(state, ownProps) {
  const credit = getCreditEntity(state, { creditId: ownProps.id });

  return {
    initialValues: ownProps.id ? pick(credit, FIELDS) : {},
    currentResourceURL: ownProps.id ? credit.resource.medium : undefined,
  };
}

const form = reduxForm({
  form: 'credit',
  onSubmit: (values, dispatch, ownProps) => {
    const { id, onSubmitSuccess } = ownProps;

    const action = id ? updateCredit(id, values) : createCredit(values);

    return dispatch(action)
      .then(() => onSubmitSuccess && onSubmitSuccess());
  },
})(CreditsForm);

const connectedComponent = connect(mapStateToProps)(form);
export default I18nForm(connectedComponent, creditsValidations);
