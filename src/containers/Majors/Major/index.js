import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { loadMajor, getMajorEntity } from '../../../store/ducks/majors';
import { getIsFetching } from '../../../store/ducks/loading';
import WithLoadableResource from '../../../hoc/WithLoadableResource';
import WithAuthorization from '../../../hoc/WithAuthorization';
import Major from '../../../components/Majors/Major';
import { majorsCollection as collection } from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
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

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadableResource('loadMajor', 'major')(Major));

export default injectIntl(WithAuthorization(connectedComponent));
