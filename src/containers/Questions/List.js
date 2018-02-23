import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import { getPage } from '../../store/ducks/routes';
import {
  destroyQuestionFactory,
  getDestroyingIds,
} from '../../store/ducks/questions';
import List from '../../components/Questions/List';

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUserEntity(state),
    page: getPage(state),
    destroyingIds: getDestroyingIds(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDestroyClicked: (id, majorId, page) =>
      dispatch(destroyQuestionFactory(ownProps.pending)(id, majorId, page)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(List));
