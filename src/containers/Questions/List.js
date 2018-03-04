import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getHasAdminPrivileges } from '../../store/ducks/sessions';
import { getPage } from '../../store/ducks/routes';
import { getPagingFns } from '../../store/ducks/questions';
import List from '../../components/Questions/List';

function mapStateToProps(state, ownProps) {
  const { majorId, pending } = ownProps;
  const page = getPage(state);
  const params = { majorId, page };

  return {
    hasAdminPrivileges: getHasAdminPrivileges(state, params),
    questions: getPagingFns(pending, majorId).getPagedEntities(state, params),
  };
}

export default injectIntl(connect(mapStateToProps)(List));
