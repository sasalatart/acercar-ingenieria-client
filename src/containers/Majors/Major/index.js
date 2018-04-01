import { connect } from 'react-redux';
import { replace as replaceRoute } from 'react-router-redux';
import { injectIntl } from 'react-intl';
import { getPathname } from '../../../store/ducks/routes';
import {
  collection,
  loadMajor,
  getMajorEntity,
} from '../../../store/ducks/majors';
import { getIsFetching } from '../../../store/ducks/loading';
import WithAuthorization from '../../../hoc/WithAuthorization';
import Major from '../../../components/Majors/Major';

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };
  const major = getMajorEntity(state, params);

  return {
    loading: !major && getIsFetching(state, params),
    id: +params.id,
    major,
    activeMenuKey: getPathname(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadMajor: () => dispatch(loadMajor(ownProps.match.params.id)),
    replaceRoute: route => dispatch(replaceRoute(route)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Major);
export default injectIntl(WithAuthorization(connectedComponent));