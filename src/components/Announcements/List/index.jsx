import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../../containers/Pagination';
import Form from '../../../containers/Announcements/Form';
import Item from './Item';
import Lightbox from '../../Lightbox';
import ActionBar from './ActionBar';
import Title from '../../Layout/Title';
import { paginationShape, announcementShape } from '../../../shapes';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
};

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

  renderAnnouncements() {
    const { announcements } = this.props;

    return (
      <div style={styles.container}>
        {announcements.map(announcement => (
          <Item
            key={announcement.id}
            announcement={announcement}
            onClick={this.handleAnnouncementClicked}
          />
        ))}
      </div>
    );
  }

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
          render={() => this.renderAnnouncements()}
          loadFn={loadAnnouncements}
        />

        {!loading &&
          <Lightbox
            open={lightboxOpen}
            images={this.createImagesArray()}
            startingIndex={clickedIndex}
            onClose={this.handleLightboxClosed}
          />}

        {renderModal(t({ id: 'announcements.new' }), <Form onSubmitSuccess={onModalClose} />)}
      </div>
    );
  }
}
