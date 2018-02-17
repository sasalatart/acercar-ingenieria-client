import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import { changeMajorsTab, goToMajor } from '../../routes';
import Majors from '../../components/Majors';

function mapStateToProps(state) {
  return {
    disciplinaryMajors: getDisciplinaryMajors(state),
    interdisciplinaryMajors: getInterdisciplinaryMajors(state),
  };
}

const mapDispatchToProps = {
  loadMajors,
  changeMajorsTab,
  goToMajor,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Majors));
