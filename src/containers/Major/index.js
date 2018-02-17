import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import { loadMajor, getMajorEntity } from '../../store/ducks/majors';
import { changeMajorTab, getActiveTab } from '../../routes';
import Major, { TAB_NAMES } from '../../components/Major';

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;

  return {
    majorId: +params.majorId,
    major: getMajorEntity(state, params),
    currentUser: getCurrentUserEntity(state),
    activeTab: getActiveTab(ownProps.location.search, TAB_NAMES, TAB_NAMES.info),
  };
}

const mapDispatchToProps = {
  loadMajor,
  changeMajorTab,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Major));
