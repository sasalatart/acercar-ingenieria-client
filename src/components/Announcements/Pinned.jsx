import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { announcementShape } from '../../shapes';
import ButtonLink from '../../containers/ButtonLink';
import Spinner from '../Spinner';
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

export default class PinnedAnnouncements extends Component {
  static propTypes = {
    admin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    announcements: PropTypes.arrayOf(announcementShape).isRequired,
    loadPinnedAnnouncements: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadPinnedAnnouncements();
  }

  mapAnnouncements() {
    return this.props.announcements.map(announcement => (
      <div key={announcement.id}>
        <img
          alt={`announcement-${announcement.id}`}
          src={announcement.picture.large}
          style={styles.announcement}
        />
      </div>
    ));
  }

  render() {
    const { admin, loading } = this.props;

    if (loading) {
      return <Spinner absolute />;
    }

    const mappedAnnouncements = this.mapAnnouncements();

    return (
      <div>
        {admin &&
          <ButtonLink to={ROUTES.ANNOUNCEMENTS} icon="plus" shape="circle" style={styles.addButton} />}

        {mappedAnnouncements.length === 1
          ? mappedAnnouncements
          : <Carousel autoplay>{mappedAnnouncements}</Carousel>}
      </div>
    );
  }
}
