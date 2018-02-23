import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  addQueryToCurrentUri,
  getPage,
} from '../../store/ducks/routes';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import {
  loadQuestionsFactory,
  getPagingFns,
} from '../../store/ducks/questions';
import Questions from '../../components/Questions';

function mapStateToProps(state, ownProps) {
  const { majorId, pending } = ownProps;
  const defaultPage = getPage(state);
  const props = { majorId, page: defaultPage };

  const pagingFns = getPagingFns(pending, majorId);

  return {
    currentUser: getCurrentUserEntity(state),
    defaultPage,
    pagination: pagingFns.getMeta(state, props),
    questions: pagingFns.getPagedEntities(state, props),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadQuestions: (page, majorId) =>
      dispatch(loadQuestionsFactory(ownProps.pending)(page, majorId)),
    addQueryToCurrentUri: query => dispatch(addQueryToCurrentUri(query)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions));
