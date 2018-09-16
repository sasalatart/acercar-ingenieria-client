import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadMajor, getMajorEntity, getIsLoadingMajor } from '../../../store/ducks/majors';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withLoadableResource from '../../../hoc/withLoadableResource';
import withAuthorization from '../../../hoc/withAuthorization';
import Major from '../../../components/Majors/Major';

function mapStateToProps(state, { match: { params } }) {
  const major = getMajorEntity(state, params);
  return {
    ...getPlaceholderFlags(getIsLoadingMajor(state, params), major),
    major,
  };
}

function mapDispatchToProps(dispatch, { match: { params: { id } } }) {
  return {
    loadMajor: () => dispatch(loadMajor(id)),
  };
}

export default compose(
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps),
  withLoadableResource('loadMajor', 'major'),
)(Major);
