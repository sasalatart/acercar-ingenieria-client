import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import { userShape } from '../../../shapes';
import ProfileCard from '../Card';
import RolesList from './RolesList';
import MajorsList from './MajorsList';
import Spinner from '../../Spinner';
import Title from '../../Layout/Title';
import SubTitle from '../../Layout/SubTitle';

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

function ProfileInfo({ user, intl: { formatMessage: t } }) {
  if (!user) {
    return <Spinner absolute />;
  }

  return (
    <Row type="flex" justify="center" gutter={8}>
      <Col md={6}>
        <div style={styles.cardWrapper}>
          <ProfileCard user={user} />
        </div>
      </Col>
      <Col md={18}>
        <Title text={`${user.firstName} ${user.lastName}`} />
        <SubTitle text={t({ id: 'profile.generation' }, { year: user.generation })} />

        <Divider>Roles</Divider>
        <RolesList user={user} />

        <Divider style={styles.divider}>{t({ id: 'profile.majorsOfInterest' })}</Divider>
        <MajorsList majorsOfInterest={user.majorsOfInterest} />
      </Col>
    </Row>
  );
}

ProfileInfo.propTypes = {
  user: userShape,
  intl: intlShape.isRequired,
};

ProfileInfo.defaultProps = {
  user: undefined,
};

export default injectIntl(ProfileInfo);
