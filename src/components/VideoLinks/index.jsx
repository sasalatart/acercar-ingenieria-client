import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withModalForm from '../../hoc/withModalForm';
import Form from '../../containers/VideoLinks/Form';
import VideosList from '../../containers/VideoLinks/List';
import Title from '../Layout/Title';
import ActionBar from './ActionBar';
import { matchShape } from '../../shapes';
import { parseBaseCollection } from '../../lib/collections';

function VideoLinks({
  match,
  editingId,
  onNewClicked,
  onEditClicked,
  onFormClose,
  renderModal,
}) {
  const videoLinkableProps = parseBaseCollection(match.params);

  return (
    <Fragment>
      <ActionBar {...videoLinkableProps} onNewClicked={onNewClicked} />
      <Title>Videos</Title>

      <VideosList {...videoLinkableProps} onEditClicked={onEditClicked} />

      {renderModal(
        <FormattedMessage id={editingId ? 'videoLinks.edit' : 'videoLinks.new'} />,
        <Form id={editingId} {...videoLinkableProps} onSubmitSuccess={onFormClose} />,
      )}
    </Fragment>
  );
}

VideoLinks.propTypes = {
  match: matchShape.isRequired,
  formVisible: PropTypes.bool.isRequired,
  editingId: PropTypes.number,
  onNewClicked: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  renderModal: PropTypes.func.isRequired,
};

VideoLinks.defaultProps = {
  editingId: undefined,
};

export default withModalForm(VideoLinks);
