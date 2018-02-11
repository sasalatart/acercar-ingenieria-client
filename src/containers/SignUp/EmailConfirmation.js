import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getLocale } from '../../store/ducks/i18n';
import { confirmEmail } from '../../store/ducks/sessions';
import EmailConfirmation from '../../components/SignUp/EmailConfirmation';

function mapStateToProps(state) {
  return {
    locale: getLocale(state),
  };
}

const mapDispatchToProps = {
  confirmEmail,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailConfirmation));
