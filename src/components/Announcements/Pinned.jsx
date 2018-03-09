import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
    hasAdminPrivileges: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    announcements: ImmutablePropTypes.listOf(announcementShape).isRequired,
    loadPinnedAnnouncements: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadPinnedAnnouncements();
  }

  render() {
    const { hasAdminPrivileges, loading, announcements } = this.props;

    if (loading) {
      return <Spinner absolute />;
    }

    return (
      <div>
        {hasAdminPrivileges &&
          <ButtonLink to={ROUTES.ANNOUNCEMENTS} icon="plus" shape="circle" style={styles.addButton} />}

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
      </div>
    );
  }
}
