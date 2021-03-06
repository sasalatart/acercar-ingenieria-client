import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { attachmentShape } from '../../shapes';

const { Item } = List;

const styles = {
  icon: {
    fontSize: '20px',
    marginRight: '5px',
  },
  item: {
    overflow: 'hidden',
  },
};

function renderItem(attachment) {
  return (
    <Item style={styles.item}>
      <FontAwesomeIcon icon="paperclip" style={styles.icon} />
      <a href={attachment.url} target="_blank">{attachment.filename}</a>
    </Item>
  );
}

function Attachments({ attachments }) {
  return (
    <Fragment>
      <h1><FormattedMessage id="attachments" /></h1>
      <List
        dataSource={attachments}
        renderItem={renderItem}
        size="small"
        bordered
      />
    </Fragment>
  );
}

Attachments.propTypes = {
  attachments: PropTypes.arrayOf(attachmentShape).isRequired,
};

export default Attachments;
