import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { announcementShape } from '../../shapes';
import ButtonLink from '../../containers/ButtonLink';
import Image, { sizes } from '../Image';
import routes from '../../lib/routes';

const styles = {
  announcement: {
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
      <Image
        src={announcement.picture.large}
        size={sizes.large}
        spinnerSize="large"
        style={styles.announcement}
      />
    </div>
  ));
}

function PinnedAnnouncements({ admin, announcements }) {
  const mappedAnnouncements = mapAnnouncements(announcements);

  return (
    <Fragment>
      {admin &&
        <ButtonLink
          to={routes.announcements}
          icon="plus"
          shape="circle"
          style={styles.addButton}
        />
      }

      {mappedAnnouncements.length === 1
        ? mappedAnnouncements
        : <Carousel autoplay>{mappedAnnouncements}</Carousel>
      }
    </Fragment>
  );
}

PinnedAnnouncements.propTypes = {
  admin: PropTypes.bool.isRequired,
  announcements: PropTypes.arrayOf(announcementShape).isRequired,
};

export default PinnedAnnouncements;
