import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Layout/Pagination';
import VideoItem from './Item';
import { paginationShape, videoLinkShape } from '../../../shapes';

const styles = {
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
};

function renderVideos(adminOrMajorAdmin, videos, onEditClicked) {
  return (
    <div style={styles.itemsContainer}>
      {videos.map(video => (
        <VideoItem
          key={video.id}
          adminOrMajorAdmin={adminOrMajorAdmin}
          video={video}
          onEditClicked={onEditClicked}
        />
      ))}
    </div>
  );
}

function VideosList({
  adminOrMajorAdmin,
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
      render={() => renderVideos(adminOrMajorAdmin, videos, onEditClicked)}
    />
  );
}

VideosList.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
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
