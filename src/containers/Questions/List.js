import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getPage } from '../../store/ducks/routes';
import { getPagingFns } from '../../store/ducks/questions';
import WithAuthorization from '../../hoc/WithAuthorization';
import List from '../../components/Questions/List';

function mapStateToProps(state, ownProps) {
  const { majorId, pending } = ownProps;
  const page = getPage(state);
  const params = { majorId, page };

  return {
    questions: getPagingFns(pending, majorId).getPagedEntities(state, params),
  };
}

export default injectIntl(WithAuthorization(connect(mapStateToProps)(List)));
