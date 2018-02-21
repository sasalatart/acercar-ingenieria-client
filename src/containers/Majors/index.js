import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToMajor } from '../../store/ducks/routes';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import Majors from '../../components/Majors';

function mapStateToProps(state) {
  return {
    disciplinaryMajors: getDisciplinaryMajors(state),
    interdisciplinaryMajors: getInterdisciplinaryMajors(state),
  };
}

const mapDispatchToProps = {
  loadMajors,
  goToMajor,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Majors));
