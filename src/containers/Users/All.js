import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { addQueryToCurrentUri } from '../../store/ducks/routes';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import AllUsers from '../../components/Users/All';

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

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(AllUsers);
export default injectIntl(connectedComponent);
