import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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
    loading: !disciplinaryMajors.length && !interdisciplinaryMajors.length,
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
