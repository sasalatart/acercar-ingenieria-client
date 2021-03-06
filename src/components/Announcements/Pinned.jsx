import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Carousel } from 'antd';
import Image, { sizes } from '../Layout/Image';
import ToolTipIcon from '../Icons/ToolTipIcon';
import { announcementShape } from '../../shapes';
import routes from '../../lib/routes';

const styles = {
  announcement: {
    width: '100%',
    height: 'auto',
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
  const tooltip = <FormattedMessage id="announcements.goToManagement" />;
  const mappedAnnouncements = mapAnnouncements(announcements);

  return (
    <Fragment>
      {admin &&
        <ToolTipIcon
          toolTip={tooltip}
          to={routes.announcements}
          icon="plus"
          shape="circle"
          style={styles.addButton}
          button
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
