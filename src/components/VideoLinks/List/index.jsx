import React from 'react';
import PropTypes from 'prop-types';
import PaginationControls from '../../../containers/Layout/Pagination';
import VideoItem from './Item';
import { paginationInfoShape, videoLinkShape } from '../../../shapes';

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
  noData,
  videos,
  paginationInfo,
  loadVideoLinks,
  onEditClicked,
}) {
  return (
    <PaginationControls
      paginationInfo={paginationInfo}
      loading={loading}
      noData={noData}
      loadFn={loadVideoLinks}
      render={() => renderVideos(adminOrMajorAdmin, videos, onEditClicked)}
    />
  );
}

VideosList.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  noData: PropTypes.bool.isRequired,
  videos: PropTypes.arrayOf(videoLinkShape).isRequired,
  paginationInfo: paginationInfoShape.isRequired,
  loadVideoLinks: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
};

export default VideosList;
