import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { resetPagination, getSuffix } from '../../../store/ducks/discussions';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../components/Discussions/List/ActionBar';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    resetPagination: () => dispatch(resetPagination(getSuffix(ownProps.mine))),
  };
}

const connectedComponent = connect(null, mapDispatchToProps)(ActionBar);
export default injectIntl(WithAuthorization(connectedComponent));
