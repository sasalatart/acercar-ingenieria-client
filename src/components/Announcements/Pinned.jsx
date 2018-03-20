import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { announcementShape } from '../../shapes';
import ButtonLink from '../../containers/ButtonLink';
import DataPlaceholder from '../DataPlaceholder';
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

  renderContent() {
    const { loading, announcements } = this.props;

    const noData = !loading && isEmpty(announcements);
    if (loading || noData) {
      return <DataPlaceholder noData={noData} absolute />;
    }

    const mappedAnnouncements = this.mapAnnouncements();
    return mappedAnnouncements.length === 1
      ? mappedAnnouncements
      : <Carousel autoplay>{mappedAnnouncements}</Carousel>;
  }

  render() {
    return (
      <div>
        {this.props.admin &&
          <ButtonLink
            to={ROUTES.ANNOUNCEMENTS}
            icon="plus"
            shape="circle"
            style={styles.addButton}
          />
        }
        {this.renderContent()}
      </div>
    );
  }
}
