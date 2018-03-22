import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { addQueryToCurrentUri } from '../../store/ducks/routes';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import Users from '../../components/Users/Search';

function mapStateToProps(state) {
  const disciplinaryMajors = getDisciplinaryMajors(state);
  const interdisciplinaryMajors = getInterdisciplinaryMajors(state);

  return {
    disciplinaryMajors,
    interdisciplinaryMajors,
  };
}

const mapDispatchToProps = {
  loadMajors,
  addQueryToCurrentUri,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Users);
export default injectIntl(connectedComponent);
