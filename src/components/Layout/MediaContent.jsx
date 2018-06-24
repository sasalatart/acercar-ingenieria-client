import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import RichText from '../RichText';
import Attachments from '../Attachments';
import { attachmentShape } from '../../shapes';

function MediaContent({ richText, attachments }) {
  const hasAttachments = attachments.length !== 0;

  return (
    <Fragment>
      <RichText content={richText} />

      {hasAttachments && <Divider />}
      {hasAttachments && <Attachments attachments={attachments} />}
    </Fragment>
  );
}

MediaContent.propTypes = {
  richText: PropTypes.string,
  attachments: PropTypes.arrayOf(attachmentShape),
};

MediaContent.defaultProps = {
  richText: undefined,
  attachments: [],
};

export default MediaContent;
