import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Modal } from 'antd';
import WithModalForm from '../../hoc/WithModalForm';
import Form from '../../containers/VideoLinks/Form';
import VideosList from '../../containers/VideoLinks/List';
import VideosActionBar from './ActionBar';
import Title from '../Layout/Title';
import { parseBaseResource } from '../../routes';
import { matchShape } from '../../shapes';

function VideoLinks({
  match,
  formVisible,
  editingId,
  onNewClicked,
  onEditClicked,
  onFormClose,
  intl: { formatMessage: t },
}) {
  const videoLinkableProps = parseBaseResource(match.params);

  return (
    <div>
      <VideosActionBar {...videoLinkableProps} onNewClicked={onNewClicked} />
      <Title text="Videos" />

      <VideosList {...videoLinkableProps} onEditClicked={onEditClicked} />

      <Modal
        title={editingId ? t({ id: 'videoLinks.edit' }) : t({ id: 'videoLinks.new' })}
        visible={formVisible}
        footer={null}
        onCancel={onFormClose}
        destroyOnClose
      >
        <Form id={editingId} {...videoLinkableProps} onSubmitSuccess={onFormClose} />
      </Modal>
    </div>
  );
}

VideoLinks.propTypes = {
  match: matchShape.isRequired,
  formVisible: PropTypes.bool.isRequired,
  editingId: PropTypes.number,
  onNewClicked: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

VideoLinks.defaultProps = {
  editingId: undefined,
};

export default injectIntl(WithModalForm(VideoLinks));
