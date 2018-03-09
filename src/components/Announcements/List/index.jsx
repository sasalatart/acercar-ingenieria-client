import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'antd';
import PaginationControls from '../../../containers/Pagination';
import AnnouncementItem from './Item';
import Lightbox from '../../Lightbox';
import { paginationShape, announcementShape } from '../../../shapes';

const GRID_SETTINGS = { xs: 1, sm: 2, md: 4 };

export default class Announcements extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    announcements: ImmutablePropTypes.setOf(announcementShape),
    loadAnnouncements: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    announcements: new Set(),
  }

  state = { lightboxOpen: false, clickedIndex: undefined };

  handleAnnouncementClicked = (announcementId) => {
    this.setState({
      lightboxOpen: true,
      clickedIndex: this.props.announcements.map(({ id }) => id).toList().indexOf(announcementId),
    });
  }

  handleLightboxClosed = () => this.setState({ lightboxOpen: false, clickedIndex: undefined });

  createImagesArray() {
    return this.props.announcements
      .map(({ picture: { thumb, large } }) => ({ src: large, thumbnail: thumb })).toJS();
  }

  renderAnnouncement = announcement =>
    <AnnouncementItem announcement={announcement} onClick={this.handleAnnouncementClicked} />;

  render() {
    const {
      loading, pagination, announcements, loadAnnouncements,
    } = this.props;
    const { lightboxOpen, clickedIndex } = this.state;

    return (
      <div>
        <PaginationControls
          pagination={pagination}
          loading={loading}
          render={() => (
            <List
              grid={GRID_SETTINGS}
              dataSource={announcements.toJS()}
              renderItem={this.renderAnnouncement}
            />
          )}
          loadFn={loadAnnouncements}
        />

        {!loading &&
          <Lightbox
            open={lightboxOpen}
            images={this.createImagesArray()}
            startingIndex={clickedIndex}
            onClose={this.handleLightboxClosed}
          />}
      </div>
    );
  }
}
