import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { resetPagination as resetUsersPagination } from '../../../store/ducks/users';
import { resetPagination as resetAdminsPagination } from '../../../store/ducks/admins';
import ActionBar from '../../../components/Users/List/ActionBar';

function mapDispatchToProps(dispatch, ownProps) {
  const resetPaginationFn = ownProps.admins ? resetAdminsPagination : resetUsersPagination;

  return {
    resetPagination: () => dispatch(resetPaginationFn({ baseResourceId: ownProps.majorId })),
  };
}

const connectedComponent = connect(null, mapDispatchToProps)(ActionBar);
export default injectIntl(connectedComponent);
