import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
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

function RolesList({ user, intl: { formatMessage: t } }) {
  const roles = [];

  if (user.admin) {
    roles.push({ icon: 'star', name: t({ id: 'admin.ofPlatform' }) });
  }

  if (!isEmpty(user.adminOfMajors)) {
    roles.push(...user.adminOfMajors.map(({ name }) => ({
      icon: 'book',
      name: t({ id: 'admin.ofMajor' }, { major: name }),
    })));
  }

  if (!roles.length) {
    roles.push({ icon: 'user', name: t({ id: 'student' }) });
  }

  return (
    <List dataSource={roles} renderItem={renderRole} bordered />
  );
}

RolesList.propTypes = {
  user: userShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(RolesList);
