import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { goToUser } from '../../../../store/ducks/routes';
import {
  getCollectionParams,
  loadAdmins,
  getPagingFns,
} from '../../../../store/ducks/admins';
import { getIsFetching } from '../../../../store/ducks/loading';
import MajorAdmins from '../../../../components/Majors/Major/Admins';

function mapStateToProps(state, ownProps) {
  const params = { ...getCollectionParams(ownProps.majorId), paged: true };
  const pagingFns = getPagingFns(params, true).selectors;

  const majorAdmins = pagingFns.getPagedEntities(state, params);

  return {
    loading: isEmpty(majorAdmins) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    majorAdmins,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadAdmins: ({ page }) => dispatch(loadAdmins(page, ownProps.majorId)),
    goToUser: id => dispatch(goToUser(id)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorAdmins));
