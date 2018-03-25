import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import noop from 'lodash/noop';
import { colors } from '../theme';

function TagList({ tags, onTagClick }) {
  return (
    <span>
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
  onTagClick: PropTypes.func,
};

TagList.defaultProps = {
  onTagClick: noop,
};

export default TagList;
