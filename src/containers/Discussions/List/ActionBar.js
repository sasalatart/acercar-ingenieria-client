import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { resetPagination } from '../../../store/ducks/discussions';
import ActionBar from '../../../components/Discussions/List/ActionBar';
import { getSuffix } from '../../../lib/discussions';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    resetPagination: () => dispatch(resetPagination({ suffix: getSuffix(ownProps.mine) })),
  };
}

const connectedComponent = connect(null, mapDispatchToProps)(ActionBar);
export default injectIntl(connectedComponent);
