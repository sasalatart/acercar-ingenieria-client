import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import ReactPlayer from 'react-player';
import lowerFirst from 'lodash/lowerFirst';
import WithAuthorization from '../../../hoc/WithAuthorization';
import DestroyButton from '../../../containers/DestroyButton';
import IconText from '../../IconText';
import { videoLinkShape } from '../../../shapes';
import { themeStyles } from '../../../theme';

const styles = {
  card: {
    width: '225px',
    margin: '5px',
  },
  video: {
    maxWidth: '205px',
    maxHeight: '115px',
  },
  videoWrapper: themeStyles.mediaContainer,
};

function VideoItem({
  adminOrMajorAdmin,
  video,
  onEditClicked,
}) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const editButton = <Icon type="edit" onClick={() => onEditClicked(video.id)} />;
    actions.push(editButton);

    const destroyButton = (
      <DestroyButton
        baseResourceName={`${lowerFirst(video.videoLinkableType)}s`}
        baseResourceId={video.videoLinkableId}
        collection="videoLinks"
        id={video.id}
        iconOnly
      />
    );
    actions.push(destroyButton);
  }

  const title = video.pinned ? <IconText type="star" text={video.title} /> : video.title;
  return (
    <Card title={title} actions={actions} style={styles.card}>
      <div style={styles.videoWrapper}>
        <ReactPlayer url={video.url} style={styles.video} controls />
      </div>
    </Card>
  );
}

VideoItem.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  video: videoLinkShape.isRequired,
  onEditClicked: PropTypes.func.isRequired,
};

export default WithAuthorization(VideoItem);
