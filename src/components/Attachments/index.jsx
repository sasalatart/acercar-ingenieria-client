import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List, Icon } from 'antd';
import { attachmentShape } from '../../shapes';

const { Item } = List;

function renderItem(attachment) {
  return (
    <Item>
      <Icon type="paper-clip" />
      <a href={attachment.url} target="_blank">{attachment.documentFileName}</a>
    </Item>
  );
}

function Attachments({ attachments, intl: { formatMessage: t } }) {
  return (
    <div>
      <h1>{t({ id: 'attachments' })}</h1>
      <List
        dataSource={attachments}
        renderItem={renderItem}
        size="small"
        bordered
      />
    </div>
  );
}

Attachments.propTypes = {
  attachments: PropTypes.arrayOf(attachmentShape).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Attachments);
