import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import { getPage } from '../../store/ducks/routes';
import {
  destroyQuestion,
  getDestroyingIds,
} from '../../store/ducks/questions';
import AnsweredList from '../../components/Questions/AnsweredList';

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUserEntity(state),
    page: getPage(state),
    destroyingIds: getDestroyingIds(state),
  };
}

const mapDispatchToProps = {
  onDestroy: destroyQuestion,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnsweredList));
