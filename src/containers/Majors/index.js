import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import WithAuthorization from '../../hoc/WithAuthorization';
import Majors from '../../components/Majors';

function mapStateToProps(state) {
  const disciplinaryMajors = getDisciplinaryMajors(state);
  const interdisciplinaryMajors = getInterdisciplinaryMajors(state);

  return {
    loading: !disciplinaryMajors.size && !interdisciplinaryMajors.size,
    disciplinaryMajors,
    interdisciplinaryMajors,
  };
}

const mapDispatchToProps = {
  loadMajors,
};

export default injectIntl(WithAuthorization(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Majors)));
