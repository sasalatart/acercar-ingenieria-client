import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import { getPage } from '../../store/ducks/routes';
import List from '../../components/Questions/List';

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUserEntity(state),
    page: getPage(state),
  };
}

export default injectIntl(connect(mapStateToProps)(List));
