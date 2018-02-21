import { connect } from 'react-redux';
import { replace as replaceRoute } from 'react-router-redux';
import { injectIntl } from 'react-intl';
import { getPathname } from '../../store/ducks/routes';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import {
  loadMajor,
  getMajorEntity,
} from '../../store/ducks/majors';
import Major from '../../components/Major';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;

  return {
    majorId: +params.majorId,
    major: getMajorEntity(state, params),
    currentUser: getCurrentUserEntity(state),
    activeMenuKey: getPathname(state),
  };
}

const mapDispatchToProps = {
  loadMajor,
  replaceRoute,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Major));
