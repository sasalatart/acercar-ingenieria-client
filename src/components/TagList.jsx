import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tag } from 'antd';
import noop from 'lodash/noop';
import { colors } from '../theme';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '20px',
    marginRight: '5px',
  },
};

function TagList({ tags, onTagClick, withIcon }) {
  return (
    <span style={styles.container}>
      {withIcon && <Icon type="tags" style={styles.icon} />}
      {tags.map(tag => (
        <Tag key={tag} color={colors.primaryDark} onClick={() => onTagClick(tag)}>
          {tag}
        </Tag>
      ))}
    </span>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  withIcon: PropTypes.bool,
  onTagClick: PropTypes.func,
};

TagList.defaultProps = {
  withIcon: false,
  onTagClick: noop,
};

export default TagList;
