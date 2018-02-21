import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  addQueryToCurrentUri,
  getPage,
} from '../../store/ducks/routes';
import {
  loadAnsweredMajorQuestions,
  getAnsweredEntities,
  getAnsweredPaginationMeta,
} from '../../store/ducks/questions';
import MajorQuestions from '../../components/Major/Questions';

function mapStateToProps(state, ownProps) {
  const { majorId } = ownProps;
  const defaultPage = getPage(state);
  const props = { majorId, page: defaultPage };

  return {
    defaultPage,
    pagination: getAnsweredPaginationMeta(state, props),
    majorQuestions: getAnsweredEntities(state, props),
  };
}

const mapDispatchToProps = {
  loadAnsweredMajorQuestions,
  addQueryToCurrentUri,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorQuestions));
