import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List, Icon } from 'antd';
import { attachmentShape } from '../shapes';

const { Item } = List;

const styles = {
  icon: {
    fontSize: '21px',
  },
  item: {
    overflow: 'hidden',
  },
};

function renderItem(attachment) {
  return (
    <Item style={styles.item}>
      <Icon type="paper-clip" style={styles.icon} />
      <a href={attachment.url} target="_blank">{attachment.filename}</a>
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
