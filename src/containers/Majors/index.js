import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getHasAdminPrivileges } from '../../store/ducks/sessions';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import Majors from '../../components/Majors';

function mapStateToProps(state) {
  const disciplinaryMajors = getDisciplinaryMajors(state);
  const interdisciplinaryMajors = getInterdisciplinaryMajors(state);

  return {
    hasAdminPrivileges: getHasAdminPrivileges(state),
    loading: !disciplinaryMajors.size && !interdisciplinaryMajors.size,
    disciplinaryMajors,
    interdisciplinaryMajors,
  };
}

const mapDispatchToProps = {
  loadMajors,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Majors));
