import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  loadQuestions,
  getPagingFns,
} from '../../store/ducks/questions';
import Questions from '../../components/Questions';

function mapStateToProps(state, ownProps) {
  const majorId = +ownProps.match.params.majorId;
  const pending = !!ownProps.match.params.pending;

  const params = { majorId, pending };

  const pagingFns = getPagingFns(pending, majorId);
  const questions = pagingFns.getPagedEntities(state, params);

  return {
    majorId,
    pending,
    loading: !questions || questions.isEmpty(),
    pagination: pagingFns.getMeta(state, params),
    questions,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const majorId = +ownProps.match.params.majorId;
  const pending = !!ownProps.match.params.pending;

  return {
    loadQuestions: (page = 1) =>
      dispatch(loadQuestions(page, majorId, pending)),
  };
}

export default withRouter(injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions)));
