import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getPage } from '../../store/ducks/routes';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import {
  loadQuestionsFactory,
  getPagingFns,
} from '../../store/ducks/questions';
import Questions from '../../components/Questions';

function mapStateToProps(state, ownProps) {
  const { majorId, pending } = ownProps;
  const params = { majorId, page: getPage(state) };

  const pagingFns = getPagingFns(pending, majorId);
  const questions = pagingFns.getPagedEntities(state, params);

  return {
    loading: !questions || questions.isEmpty(),
    loggedIn: !!getCurrentUserEntity(state),
    pagination: pagingFns.getMeta(state, params),
    questions,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadQuestions: (page = 1) =>
      dispatch(loadQuestionsFactory(ownProps.pending)(page, ownProps.majorId)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions));
