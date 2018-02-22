import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  addQueryToCurrentUri,
  getPage,
} from '../../../store/ducks/routes';
import { getCurrentUserEntity } from '../../../store/ducks/sessions';
import {
  loadAnsweredMajorQuestions,
  getAnsweredEntities,
  getAnsweredPaginationMeta,
} from '../../../store/ducks/questions';
import AnsweredQuestions from '../../../components/Questions/Answered';

function mapStateToProps(state, ownProps) {
  const { majorId } = ownProps;
  const defaultPage = getPage(state);
  const props = { majorId, page: defaultPage };

  return {
    currentUser: getCurrentUserEntity(state),
    defaultPage,
    pagination: getAnsweredPaginationMeta(state, props),
    questions: getAnsweredEntities(state, props),
  };
}

const mapDispatchToProps = {
  loadAnsweredQuestions: loadAnsweredMajorQuestions,
  addQueryToCurrentUri,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnsweredQuestions));
