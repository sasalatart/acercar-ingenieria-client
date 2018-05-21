import React, { Fragment } from 'react';
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

function renderSubTitle(user, admin, t) {
  const textPrefix = t({ id: 'profile.generation' }, { year: user.generation });

  if (!admin) return textPrefix;

  const emailTag = <a href={`mailto:${user.email}`}>{user.email}</a>;
  return <p>{textPrefix}, {emailTag}</p>;
}

function ProfileInfo({ admin, user, intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar user={user} />
      <Row type="flex" justify="center" gutter={8}>
        <Col md={6}>
          <div style={styles.cardWrapper}>
            <ProfileCard user={user} />
          </div>
        </Col>
        <Col md={18}>
          <Title>{user.firstName} {user.lastName}</Title>
          <SubTitle>{renderSubTitle(user, admin, t)}</SubTitle>

          <Divider>Roles</Divider>
          <RolesList user={user} />

          <Divider style={styles.divider}>{t({ id: 'profile.majorsOfInterest' })}</Divider>
          <MajorsList majorsOfInterest={user.majorsOfInterest} />
        </Col>
      </Row>
    </Fragment>
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
