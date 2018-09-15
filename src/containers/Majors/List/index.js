import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
  getIsLoadingMajors,
} from '../../../store/ducks/majors';
import withAuthorization from '../../../hoc/withAuthorization';
import List from '../../../components/Majors/List';

function mapStateToProps(state) {
  const disciplinaryMajors = getDisciplinaryMajors(state);
  const interdisciplinaryMajors = getInterdisciplinaryMajors(state);
  const noMajors = isEmpty(disciplinaryMajors) && isEmpty(interdisciplinaryMajors);
  return {
    loading: noMajors && getIsLoadingMajors(state),
    disciplinaryMajors,
    interdisciplinaryMajors,
  };
}

const mapDispatchToProps = {
  loadMajors,
};

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(List));
