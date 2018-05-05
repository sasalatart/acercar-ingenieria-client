import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import Form from '../../../containers/Announcements/Form';
import Item from './Item';
import Lightbox from '../../Lightbox';
import ActionBar from './ActionBar';
import Title from '../../Layout/Title';

import { paginationShape, announcementShape } from '../../../shapes';

const GRID_SETTINGS = { xs: 1, sm: 2, md: 4 };

export default class Announcements extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pagination: paginationShape,
    announcements: PropTypes.arrayOf(announcementShape),
    loadAnnouncements: PropTypes.func.isRequired,
    onModalOpen: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired,
    renderModal: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    announcements: [],
  }

  state = { lightboxOpen: false, clickedIndex: undefined };

  handleAnnouncementClicked = (announcementId) => {
    this.setState({
      lightboxOpen: true,
      clickedIndex: this.props.announcements.map(({ id }) => id).indexOf(announcementId),
    });
  }

  handleLightboxClosed = () => {
    this.setState({ lightboxOpen: false, clickedIndex: undefined });
  }

  createImagesArray() {
    return this.props.announcements
      .map(({ picture: { thumb, large } }) => ({ src: large, thumbnail: thumb }));
  }

  renderAnnouncement = announcement =>
    <Item announcement={announcement} onClick={this.handleAnnouncementClicked} />;

  render() {
    const {
      loading,
      pagination,
      announcements,
      loadAnnouncements,
      onModalOpen,
      onModalClose,
      renderModal,
      intl: { formatMessage: t },
    } = this.props;
    const { lightboxOpen, clickedIndex } = this.state;

    return (
      <div>
        <ActionBar onCreateClicked={onModalOpen} />
        <Title>{t({ id: 'announcements' })}</Title>

        <PaginationControls
          pagination={pagination}
          loading={loading}
          noData={!loading && isEmpty(announcements)}
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

        {renderModal(
          t({ id: 'announcements.new' }),
          <Form onSubmitSuccess={onModalClose} />,
        )}
      </div>
    );
  }
}
