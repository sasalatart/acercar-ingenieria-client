import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import URI from 'urijs';
import { confirmEmail } from '../../store/ducks/sessions';
import EmailConfirmation from '../../components/SignUp/EmailConfirmation';

function mapDispatchToProps(dispatch, ownProps) {
  const { search } = ownProps.location;

  return {
    confirmEmail: () => dispatch(confirmEmail(URI.parseQuery(search))),
  };
}

const connectedComponent = connect(null, mapDispatchToProps)(EmailConfirmation);
export default withRouter(injectIntl(connectedComponent));
