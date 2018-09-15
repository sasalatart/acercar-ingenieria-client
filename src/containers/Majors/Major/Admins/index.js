import { connect } from 'react-redux';
import { goToUser } from '../../../../store/ducks/routes';
import { loadAdmins, getPaginationData, getIsLoadingAdmins } from '../../../../store/ducks/admins';
import { getPlaceholderFlags } from '../../../../store/ducks/shared';
import MajorAdmins from '../../../../components/Majors/Major/Admins';

function mapStateToProps(state, { majorId }) {
  const params = { baseId: majorId };
  const { paginationInfo, pagedEntities: majorAdmins } = getPaginationData(state, params);
  params.page = paginationInfo.page;
  return {
    ...getPlaceholderFlags(getIsLoadingAdmins(state, params), majorAdmins),
    paginationInfo,
    majorAdmins,
  };
}

function mapDispatchToProps(dispatch, { majorId }) {
  return {
    loadAdmins: query => dispatch(loadAdmins({ query, baseId: majorId })),
    goToUser: id => dispatch(goToUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MajorAdmins);
