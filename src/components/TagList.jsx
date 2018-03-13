import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { colors } from '../theme';

function TagList({ tags }) {
  return (
    <span>
      {tags.map(category => <Tag key={category} color={colors.primaryDark}>{category}</Tag>)}
    </span>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
