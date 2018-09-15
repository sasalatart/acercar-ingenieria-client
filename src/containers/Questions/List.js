import { connect } from 'react-redux';
import { loadQuestions, getPaginationData, getIsLoadingQuestions } from '../../store/ducks/questions';
import { getPlaceholderFlags } from '../../store/ducks/shared';
import withAuthorization from '../../hoc/withAuthorization';
import QuestionsList from '../../components/Questions/List';
import { getSuffix } from '../../lib/questions';

function mapStateToProps(state, { majorId, unanswered }) {
  const params = { baseId: majorId, majorId, suffix: getSuffix(unanswered) };
  const { paginationInfo, pagedEntities: questions } = getPaginationData(state, params);
  params.page = paginationInfo.page;
  return {
    ...getPlaceholderFlags(getIsLoadingQuestions(state, params), questions),
    paginationInfo,
    questions,
  };
}

function mapDispatchToProps(dispatch, { majorId: baseId, unanswered }) {
  const suffix = getSuffix(unanswered);
  return {
    loadQuestions: query => dispatch(loadQuestions({ query, baseId, suffix })),
  };
}

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(QuestionsList));
