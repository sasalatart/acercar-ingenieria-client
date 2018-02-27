import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { announcementShape } from '../../shapes';
import Spinner from '../Spinner';

const styles = {
  announcement: {
    height: 'auto',
    width: '100%',
  },
};

export default class PinnedAnnouncements extends Component {
  static propTypes = {
    announcements: PropTypes.arrayOf(announcementShape),
    loadPinnedAnnouncements: PropTypes.func.isRequired,
  };

  static defaultProps = {
    announcements: [],
  };

  componentDidMount() {
    this.props.loadPinnedAnnouncements();
  }

  render() {
    const { announcements } = this.props;

    if (isEmpty(announcements)) {
      return <Spinner absolute />;
    }

    return (
      <Carousel autoplay>
        {announcements.map(announcement => (
          <div key={announcement.id}>
            <img
              alt={`announcement-${announcement.id}`}
              src={announcement.picture.large}
              style={styles.announcement}
            />
          </div>
        ))}
      </Carousel>
    );
  }
}
