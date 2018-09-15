import { connect } from 'react-redux';
import { addQueryToCurrentUri, getSearch, getPage } from '../../store/ducks/routes';
import Pagination from '../../components/Layout/Pagination';

function mapStateToProps(state) {
  return {
    search: getSearch(state),
    current: getPage(state) || 1,
  };
}

const mapDispatchToProps = {
  addQueryToCurrentUri,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
