import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { injectIntl } from 'react-intl';
import ActionBar from '../../components/Layout/ActionBar';

const mapDispatchToProps = {
  goBack,
};

export default injectIntl(connect(
  null,
  mapDispatchToProps,
)(ActionBar));
