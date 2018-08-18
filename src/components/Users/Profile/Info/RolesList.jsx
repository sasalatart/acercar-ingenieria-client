import React from 'react';
import { FormattedMessage } from 'react-intl';
import { List, Avatar } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { userShape } from '../../../../shapes';

function renderRole(role) {
  return (
    <List.Item>
      <List.Item.Meta title={role.name} avatar={<Avatar icon={role.icon} />} />
    </List.Item>
  );
}

function RolesList({ user }) {
  const roles = [];

  if (user.admin) {
    roles.push({ icon: 'star', name: <FormattedMessage id="admin.ofPlatform" /> });
  }

  if (!isEmpty(user.adminOfMajors)) {
    roles.push(...user.adminOfMajors.map(({ name }) => ({
      icon: 'book',
      name: <FormattedMessage id="admin.ofMajor" values={{ major: name }} />,
    })));
  }

  if (!roles.length) {
    roles.push({ icon: 'user', name: <FormattedMessage id="student" /> });
  }

  return (
    <List dataSource={roles} renderItem={renderRole} bordered />
  );
}

RolesList.propTypes = {
  user: userShape.isRequired,
};

export default RolesList;
