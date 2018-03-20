import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import PinButton from '../../../containers/Announcements/List/PinButton';
import DestroyButton from '../../../containers/DestroyButton';
import { announcementShape } from '../../../shapes';

const { Item } = List;

const styles = {
  item: {
    margin: '10px',
  },
  image: {
    maxHeight: '200px',
  },
};

function AnnouncementItem({ announcement, onClick }) {
  const cover = (
    <img
      alt="announcement"
      src={announcement.picture.medium}
      onClick={() => onClick(announcement.id)}
      style={styles.image}
      aria-hidden
    />
  );

  const actions = [
    <PinButton id={announcement.id} pinned={announcement.pinned} />,
    <DestroyButton collection="announcements" id={announcement.id} iconOnly />,
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
