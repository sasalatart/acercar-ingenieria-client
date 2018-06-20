import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import PinButton from '../../../containers/Announcements/List/PinButton';
import DestroyButton from '../../../containers/DestroyButton';
import Image from '../../Image';
import { announcementShape } from '../../../shapes';
import collections from '../../../lib/collections';

const { Item } = List;

const styles = {
  item: {
    margin: '10px',
  },
};

function AnnouncementItem({ announcement, onClick }) {
  const cover = (
    <Image
      src={announcement.picture.medium}
      onClick={() => onClick(announcement.id)}
      style={styles.image}
      aria-hidden
    />
  );

  const actions = [
    <PinButton id={announcement.id} pinned={announcement.pinned} />,
    <DestroyButton collection={collections.announcements} id={announcement.id} iconOnly />,
  ];

  return (
    <Item style={styles.item}>
      <Card cover={cover} actions={actions} hoverable />
    </Item>
  );
}

AnnouncementItem.propTypes = {
  announcement: announcementShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AnnouncementItem;
