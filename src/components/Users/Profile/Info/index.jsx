import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import { userShape } from '../../../../shapes';
import ProfileCard from '../Card';
import RolesList from './RolesList';
import MajorsList from './MajorsList';
import WithAuthorization from '../../../../hoc/WithAuthorization';
import ActionBar from '../../../../containers/Users/Profile/Info/ActionBar';
import Title from '../../../Layout/Title';
import SubTitle from '../../../Layout/SubTitle';

const styles = {
  cardWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  divider: {
    marginTop: '50px',
  },
};

function renderSubTitleText(user, admin, t) {
  const textPrefix = t({ id: 'profile.generation' }, { year: user.generation });
  return admin ? `${textPrefix}, ${user.email}` : textPrefix;
}

function ProfileInfo({ admin, user, intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar user={user} />
      <Row type="flex" justify="center" gutter={8}>
        <Col md={6}>
          <div style={styles.cardWrapper}>
            <ProfileCard user={user} />
          </div>
        </Col>
        <Col md={18}>
          <Title text={`${user.firstName} ${user.lastName}`} />
          <SubTitle text={renderSubTitleText(user, admin, t)} />

          <Divider>Roles</Divider>
          <RolesList user={user} />

          <Divider style={styles.divider}>{t({ id: 'profile.majorsOfInterest' })}</Divider>
          <MajorsList majorsOfInterest={user.majorsOfInterest} />
        </Col>
      </Row>
    </div>
  );
}

ProfileInfo.propTypes = {
  admin: PropTypes.bool.isRequired,
  user: userShape,
  intl: intlShape.isRequired,
};

ProfileInfo.defaultProps = {
  user: undefined,
};

export default injectIntl(WithAuthorization(ProfileInfo));
