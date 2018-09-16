import { connect } from 'react-redux';
import { addQueryToCurrentUri } from '../../store/ducks/routes';
import { resetPagination as resetAdminsPagination } from '../../store/ducks/admins';
import { resetPagination as resetUsersPagination } from '../../store/ducks/users';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import AllUsers from '../../components/Users/All';

function mapStateToProps(state) {
  return {
    disciplinaryMajors: getDisciplinaryMajors(state),
    interdisciplinaryMajors: getInterdisciplinaryMajors(state),
  };
}

const mapDispatchToProps = {
  loadMajors,
  addQueryToCurrentUri,
  resetAdminsPagination,
  resetUsersPagination,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
