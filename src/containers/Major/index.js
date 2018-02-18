import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import {
  loadMajor,
  setMajorTab,
  getMajorEntity,
  getMajorTab,
} from '../../store/ducks/majors';
import Major from '../../components/Major';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;

  return {
    majorId: +params.majorId,
    major: getMajorEntity(state, params),
    currentUser: getCurrentUserEntity(state),
    activeTab: getMajorTab(state),
  };
}

const mapDispatchToProps = {
  loadMajor,
  setMajorTab,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Major));
