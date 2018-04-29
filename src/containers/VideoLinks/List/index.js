import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  loadVideoLinks,
  getPagingFns,
} from '../../../store/ducks/video-links';
import { getIsFetching } from '../../../store/ducks/loading';
import VideoLinksList from '../../../components/VideoLinks/List';
import { parseBaseResource } from '../../../routes';

function mapStateToProps(state, ownProps) {
  const { baseResourceName, baseResourceId } = parseBaseResource(ownProps.match.params);

  const params = {
    collection,
    baseResourceName,
    baseResourceId,
    paged: true,
  };

  const pagingFns = getPagingFns(baseResourceName);
  const videos = pagingFns.selectors.getPagedEntities(state, params);

  return {
    loading: isEmpty(videos) && getIsFetching(state, params),
    pagination: pagingFns.selectors.getMeta(state, params),
    videos,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { baseResourceName, baseResourceId } = parseBaseResource(ownProps.match.params);

  return {
    loadVideoLinks: ({ page }) => dispatch(loadVideoLinks(page, baseResourceName, baseResourceId)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(VideoLinksList);
export default withRouter(connectedComponent);
