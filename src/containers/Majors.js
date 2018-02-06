import { connect } from 'react-redux';
import { goToLanding } from '../store/ducks/router';
import Majors from '../components/Majors';

const mapDispatchToProps = {
  goToLanding,
};

export default connect(
  null,
  mapDispatchToProps,
)(Majors);
