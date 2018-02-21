import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  addQueryToCurrentUri,
  getPage,
} from '../../store/ducks/routes';
import {
  loadMajorUsers,
  getMajorUserEntities,
  getMajorUsersPaginationMeta,
} from '../../store/ducks/users';
import MajorUsers from '../../components/Major/Users';

function mapStateToProps(state, ownProps) {
  const { majorId } = ownProps;
  const defaultPage = getPage(state);
  const props = { majorId, page: defaultPage };

  return {
    defaultPage,
    pagination: getMajorUsersPaginationMeta(state, props),
    majorUsers: getMajorUserEntities(state, props),
  };
}

const mapDispatchToProps = {
  loadMajorUsers,
  addQueryToCurrentUri,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorUsers));
