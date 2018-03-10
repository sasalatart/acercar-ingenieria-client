import { connect } from 'react-redux';
import {
  addQueryToCurrentUri,
  getSearch,
  getPage,
} from '../store/ducks/routes';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
  return {
    search: getSearch(state),
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
