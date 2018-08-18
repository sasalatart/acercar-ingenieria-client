import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import ActionBar from '../../components/Layout/ActionBar';

const mapDispatchToProps = {
  goBack,
};

export default connect(null, mapDispatchToProps)(ActionBar);
