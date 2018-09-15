import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadVideoLinks, getPaginationData, getIsLoadingVideoLinks } from '../../../store/ducks/video-links';
import { getPlaceholderFlags } from '../../../store/ducks/shared';
import withAuthorization from '../../../hoc/withAuthorization';
import VideoLinksList from '../../../components/VideoLinks/List';
import { parseBaseCollection } from '../../../lib/collections';

function mapStateToProps(state, ownProps) {
  const params = parseBaseCollection(ownProps.match.params);
  const { paginationInfo, pagedEntities: videos } = getPaginationData(state, params);
  params.page = paginationInfo.page;
  return {
    ...getPlaceholderFlags(getIsLoadingVideoLinks(state, params), videos),
    paginationInfo,
    videos,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { baseId } = parseBaseCollection(ownProps.match.params);
  return {
    loadVideoLinks: query => dispatch(loadVideoLinks({ baseId, query })),
  };
}

export default compose(
  withRouter,
  withAuthorization,
  connect(mapStateToProps, mapDispatchToProps),
)(VideoLinksList);
