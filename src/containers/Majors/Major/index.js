import { connect } from 'react-redux';
import { loadMajor, getMajorEntity } from '../../../store/ducks/majors';
import { getIsFetching } from '../../../store/ducks/loading';
import withLoadableResource from '../../../hoc/withLoadableResource';
import withAuthorization from '../../../hoc/withAuthorization';
import Major from '../../../components/Majors/Major';
import collections from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection: collections.majors };
  const major = getMajorEntity(state, params);

  return {
    loading: !major && getIsFetching(state, params),
    id: +params.id,
    major,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadMajor: () => dispatch(loadMajor(ownProps.match.params.id)),
  };
}

export default withAuthorization(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadMajor', 'major')(Major)));
