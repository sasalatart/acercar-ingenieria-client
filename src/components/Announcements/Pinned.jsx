import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { announcementShape } from '../../shapes';
import ButtonLink from '../../containers/ButtonLink';
import ROUTES from '../../routes';

const styles = {
  announcement: {
    height: 'auto',
    width: '100%',
  },
  addButton: {
    position: 'absolute',
    zIndex: 1,
    top: '5px',
    right: '5px',
  },
};

function mapAnnouncements(announcements) {
  return announcements.map(announcement => (
    <div key={announcement.id}>
      <img
        alt={`announcement-${announcement.id}`}
        src={announcement.picture.large}
        style={styles.announcement}
      />
    </div>
  ));
}

function PinnedAnnouncements({ admin, announcements }) {
  const mappedAnnouncements = mapAnnouncements(announcements);

  return (
    <div>
      {admin &&
        <ButtonLink
          to={ROUTES.ANNOUNCEMENTS}
          icon="plus"
          shape="circle"
          style={styles.addButton}
        />
      }

      {mappedAnnouncements.length === 1
        ? mappedAnnouncements
        : <Carousel autoplay>{mappedAnnouncements}</Carousel>
      }
    </div>
  );
}

PinnedAnnouncements.propTypes = {
  admin: PropTypes.bool.isRequired,
  announcements: PropTypes.arrayOf(announcementShape).isRequired,
};

export default PinnedAnnouncements;
