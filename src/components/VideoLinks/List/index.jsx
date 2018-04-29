import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import VideoItem from './Item';
import { paginationShape, videoLinkShape } from '../../../shapes';

const styles = {
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

function renderVideos(videos, onEditClicked) {
  return (
    <div style={styles.itemsContainer}>
      {videos.map(video =>
        <VideoItem key={video.id} video={video} onEditClicked={onEditClicked} />)}
    </div>
  );
}

function VideosList({
  loading,
  videos,
  pagination,
  loadVideoLinks,
  onEditClicked,
}) {
  return (
    <PaginationControls
      pagination={pagination}
      loading={loading}
      noData={!loading && isEmpty(videos)}
      loadFn={loadVideoLinks}
      render={() => renderVideos(videos, onEditClicked)}
    />
  );
}

VideosList.propTypes = {
  loading: PropTypes.bool.isRequired,
  videos: PropTypes.arrayOf(videoLinkShape),
  pagination: paginationShape,
  loadVideoLinks: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
};

VideosList.defaultProps = {
  videos: [],
  pagination: undefined,
};

export default VideosList;
