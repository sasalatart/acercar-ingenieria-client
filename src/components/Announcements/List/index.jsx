import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import PaginationControls from '../../../containers/Layout/Pagination';
import Form from '../../../containers/Announcements/Form';
import Title from '../../Layout/Title';
import Lightbox from '../../Layout/Lightbox';
import Item from './Item';
import ActionBar from './ActionBar';
import { paginationInfoShape, announcementShape } from '../../../shapes';
import { breakpoints } from '../../../theme';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    [breakpoints.xs]: {
      justifyContent: 'center',
    },
  },
};

export default class Announcements extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    paginationInfo: paginationInfoShape.isRequired,
    announcements: PropTypes.arrayOf(announcementShape).isRequired,
    loadAnnouncements: PropTypes.func.isRequired,
    onModalOpen: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired,
    renderModal: PropTypes.func.isRequired,
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
    return (
      <div style={styles.container}>
        {this.props.announcements.map(announcement => (
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
      noData,
      paginationInfo,
      loadAnnouncements,
      onModalOpen,
      onModalClose,
      renderModal,
    } = this.props;
    const { lightboxOpen, clickedIndex } = this.state;

    return (
      <Fragment>
        <ActionBar onCreateClicked={onModalOpen} />
        <Title><FormattedMessage id="announcements" /></Title>

        <PaginationControls
          paginationInfo={paginationInfo}
          loading={loading}
          noData={noData}
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

        {renderModal(<FormattedMessage id="announcements.new" />, <Form onSubmitSuccess={onModalClose} />)}
      </Fragment>
    );
  }
}
