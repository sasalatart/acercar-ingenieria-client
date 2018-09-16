import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withAuthorization from '../../hoc/withAuthorization';
import withModalForm from '../../hoc/withModalForm';
import Form from '../../containers/VideoLinks/Form';
import VideosList from '../../containers/VideoLinks/List';
import HideableButton from '../Icons/HideableButton';
import { matchShape } from '../../shapes';
import { parseBaseCollection } from '../../lib/collections';

function getActions(adminOrMajorAdmin, onNewClicked) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const newVideoLinkButton = (
      <HideableButton type="primary" icon="plus" onClick={onNewClicked}>
        <FormattedMessage id="videoLinks.new" />
      </HideableButton>
    );

    actions.push(newVideoLinkButton);
  }

  return actions;
}

function VideoLinks({
  adminOrMajorAdmin,
  match,
  renderHeader,
  editingId,
  onNewClicked,
  onEditClicked,
  onFormClose,
  renderModal,
}) {
  const videoLinkableProps = parseBaseCollection(match.params);

  return (
    <Fragment>
      {renderHeader({ subtitle: 'Videos', actions: getActions(adminOrMajorAdmin, onNewClicked) })}

      <VideosList {...videoLinkableProps} onEditClicked={onEditClicked} />

      {renderModal(
        <FormattedMessage id={editingId ? 'videoLinks.edit' : 'videoLinks.new'} />,
        <Form id={editingId} {...videoLinkableProps} onSubmitSuccess={onFormClose} />,
      )}
    </Fragment>
  );
}

VideoLinks.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  match: matchShape.isRequired,
  renderHeader: PropTypes.func.isRequired,
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

export default withAuthorization(withModalForm(VideoLinks));
