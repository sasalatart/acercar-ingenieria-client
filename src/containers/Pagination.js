import { connect } from 'react-redux';
import {
  addQueryToCurrentUri,
  getPage,
} from '../store/ducks/routes';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
  return {
    current: getPage(state),
  };
}

const mapDispatchToProps = {
  addQueryToCurrentUri,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pagination);
