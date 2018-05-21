import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithModalForm from '../../hoc/WithModalForm';
import Form from '../../containers/VideoLinks/Form';
import VideosList from '../../containers/VideoLinks/List';
import ActionBar from './ActionBar';
import Title from '../Layout/Title';
import { parseBaseResource } from '../../routes';
import { matchShape } from '../../shapes';

function VideoLinks({
  match,
  editingId,
  onNewClicked,
  onEditClicked,
  onFormClose,
  renderModal,
  intl: { formatMessage: t },
}) {
  const videoLinkableProps = parseBaseResource(match.params);

  return (
    <Fragment>
      <ActionBar {...videoLinkableProps} onNewClicked={onNewClicked} />
      <Title>Videos</Title>

      <VideosList {...videoLinkableProps} onEditClicked={onEditClicked} />

      {renderModal(
        editingId ? t({ id: 'videoLinks.edit' }) : t({ id: 'videoLinks.new' }),
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
  intl: intlShape.isRequired,
};

VideoLinks.defaultProps = {
  editingId: undefined,
};

export default injectIntl(WithModalForm(VideoLinks));
