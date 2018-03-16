import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List, Modal } from 'antd';
import PaginationControls from '../../../containers/Pagination';
import Form from '../../../containers/Announcements/Form';
import AnnouncementItem from './Item';
import Lightbox from '../../Lightbox';
import AnnouncementsActionBar from './ActionBar';
import Title from '../../Layout/Title';

import { paginationShape, announcementShape } from '../../../shapes';

const GRID_SETTINGS = { xs: 1, sm: 2, md: 4 };

export default class Announcements extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    announcements: PropTypes.arrayOf(announcementShape),
    loadAnnouncements: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    announcements: [],
  }

  state = { lightboxOpen: false, clickedIndex: undefined, formVisible: false };

  handleAnnouncementClicked = (announcementId) => {
    this.setState({
      lightboxOpen: true,
      clickedIndex: this.props.announcements.map(({ id }) => id).toList().indexOf(announcementId),
    });
  }

  handleLightboxClosed = () => {
    this.setState({ lightboxOpen: false, clickedIndex: undefined });
  }

  handleCreateClicked = () => {
    this.setState({ formVisible: true });
  }

  handleFormClose = () => {
    this.setState({ formVisible: false });
  }

  createImagesArray() {
    return this.props.announcements
      .map(({ picture: { thumb, large } }) => ({ src: large, thumbnail: thumb }));
  }

  renderAnnouncement = announcement =>
    <AnnouncementItem announcement={announcement} onClick={this.handleAnnouncementClicked} />;

  renderFormModal() {
    const { intl: { formatMessage: t } } = this.props;
    const { formVisible } = this.state;

    return (
      <Modal
        title={t({ id: 'announcements.new' })}
        visible={formVisible}
        footer={null}
        onCancel={this.handleFormClose}
        destroyOnClose
      >
        <Form onSubmitSuccess={this.handleFormClose} />
      </Modal>
    );
  }

  render() {
    const {
      loading, pagination, announcements, loadAnnouncements, intl: { formatMessage: t },
    } = this.props;
    const { lightboxOpen, clickedIndex } = this.state;

    return (
      <div>
        <AnnouncementsActionBar onCreateClicked={this.handleCreateClicked} />
        <Title text={t({ id: 'announcements' })} />

        <PaginationControls
          pagination={pagination}
          loading={loading}
          render={() => (
            <List
              grid={GRID_SETTINGS}
              dataSource={announcements}
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

        {this.renderFormModal()}
      </div>
    );
  }
}
