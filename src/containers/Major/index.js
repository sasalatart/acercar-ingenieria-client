import { connect } from 'react-redux';
import { replace as replaceRoute } from 'react-router-redux';
import { injectIntl } from 'react-intl';
import { getPathname } from '../../store/ducks/routes';
import {
  loadMajor,
  getMajorEntity,
} from '../../store/ducks/majors';
import WithAuthorization from '../../hoc/WithAuthorization';
import Major from '../../components/Major';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;

  return {
    majorId: +params.majorId,
    major: getMajorEntity(state, params),
    activeMenuKey: getPathname(state),
  };
}

const mapDispatchToProps = {
  loadMajor,
  replaceRoute,
};

export default injectIntl(WithAuthorization(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Major)));
