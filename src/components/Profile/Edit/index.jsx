import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Divider } from 'antd';
import EditForm from '../../../containers/Profile/Edit/Form';
import ChangePassword from './ChangePassword';
import { userShape } from '../../../shapes';
import { themeStyles } from '../../../theme';

const styles = {
  title: themeStyles.title,
};

function ProfileEdit({ currentUser, intl: { formatMessage: t } }) {
  return (
    <div>
      <h1 style={styles.title}>{t({ id: 'routing.profileEdit' })}</h1>

      <EditForm currentUser={currentUser} />

      <Divider />

      <ChangePassword />
    </div>
  );
}

ProfileEdit.propTypes = {
  currentUser: userShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileEdit);
