import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { addQueryToMajorPath } from '../../store/ducks/majors';
import {
  loadAnsweredMajorQuestions,
  getPagedAnsweredMajorQuestionEntities,
  getAnsweredMajorQuestionsPaginationMeta,
} from '../../store/ducks/questions';
import { getActivePage } from '../../routes';
import MajorQuestions from '../../components/Major/Questions';

function mapStateToProps(state, ownProps) {
  const { match, location } = ownProps;
  const majorId = +match.params.majorId;
  const activePage = getActivePage(location.search);

  const params = { majorId, page: activePage };

  return {
    majorId,
    pagination: getAnsweredMajorQuestionsPaginationMeta(state, params),
    majorQuestions: getPagedAnsweredMajorQuestionEntities(state, params),
  };
}

const mapDispatchToProps = {
  loadAnsweredMajorQuestions,
  addQueryToMajorPath,
};

export default injectIntl(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorQuestions)));
