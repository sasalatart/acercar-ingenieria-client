import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { resetPagination } from '../../../store/ducks/discussions';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../components/Discussions/List/ActionBar';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    resetPagination: () => dispatch(resetPagination(ownProps.mine)),
  };
}

const connectedComponent = connect(null, mapDispatchToProps)(ActionBar);
export default injectIntl(WithAuthorization(connectedComponent));
