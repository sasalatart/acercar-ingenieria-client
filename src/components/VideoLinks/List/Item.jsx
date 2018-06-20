import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Card, Icon } from 'antd';
import ReactPlayer from 'react-player';
import lowerFirst from 'lodash/lowerFirst';
import WithAuthorization from '../../../hoc/WithAuthorization';
import DestroyButton from '../../../containers/DestroyButton';
import IconText from '../../IconText';
import { breakpoints } from '../../../theme';
import { videoLinkShape } from '../../../shapes';
import collections from '../../../lib/collections';

const RadiumCard = Radium(Card);

const styles = {
  card: {
    width: '550px',
    margin: '5px',
    [breakpoints.sm]: {
      width: '275px',
    },
  },
  cardBody: {
    height: '310px',
    [breakpoints.sm]: {
      height: '155px',
    },
  },
};

function VideoItem({ adminOrMajorAdmin, video, onEditClicked }) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const editButton = <Icon type="edit" onClick={() => onEditClicked(video.id)} />;
    actions.push(editButton);

    const destroyButton = (
      <DestroyButton
        baseResourceName={`${lowerFirst(video.videoLinkableType)}s`}
        baseResourceId={video.videoLinkableId}
        collection={collections.videoLinks}
        id={video.id}
        iconOnly
      />
    );
    actions.push(destroyButton);
  }

  const title = video.pinned ? <IconText type="star" text={video.title} /> : video.title;
  return (
    <RadiumCard title={title} actions={actions} style={styles.card} bodyStyle={styles.cardBody}>
      <ReactPlayer url={video.url} width="100%" height="100%" controls />
    </RadiumCard>
  );
}

VideoItem.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  video: videoLinkShape.isRequired,
  onEditClicked: PropTypes.func.isRequired,
};

export default WithAuthorization(VideoItem);
