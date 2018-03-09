import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import { announcementShape } from '../../../shapes';

const { Item } = List;

const styles = {
  item: {
    margin: '10px',
  },
};

function AnnouncementItem({ announcement, onClick }) {
  const cover = <img alt="announcement" src={announcement.picture.medium} />;

  return (
    <Item style={styles.item}>
      <Card cover={cover} hoverable onClick={() => onClick(announcement.id)} />
    </Item>
  );
}

AnnouncementItem.propTypes = {
  announcement: announcementShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AnnouncementItem;
