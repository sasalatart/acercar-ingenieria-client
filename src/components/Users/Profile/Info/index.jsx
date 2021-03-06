import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import withAuthorization from '../../../../hoc/withAuthorization';
import Title from '../../../Layout/Title';
import SubTitle from '../../../Layout/SubTitle';
import ProfileCard from '../Card';
import RolesList from './RolesList';
import MajorsList from './MajorsList';
import ActionBar from './ActionBar';
import { userShape } from '../../../../shapes';

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

function renderSubTitle(user, admin) {
  const textPrefix = <FormattedMessage id="profile.generation" values={{ year: user.generation }} />;

  if (!admin) return textPrefix;

  const emailTag = <a href={`mailto:${user.email}`}>{user.email}</a>;
  return <p>{textPrefix}, {emailTag}</p>;
}

function ProfileInfo({
  admin,
  user,
  ...restProps
}) {
  return (
    <Fragment>
      <ActionBar admin={admin} user={user} {...restProps} />
      <Row type="flex" justify="center" gutter={8}>
        <Col md={6}>
          <div style={styles.cardWrapper}>
            <ProfileCard user={user} />
          </div>
        </Col>
        <Col md={18}>
          <Title>{user.firstName} {user.lastName}</Title>
          <SubTitle>{renderSubTitle(user, admin)}</SubTitle>

          <Divider>Roles</Divider>
          <RolesList user={user} />

          <Divider style={styles.divider}><FormattedMessage id="profile.majorsOfInterest" /></Divider>
          <MajorsList majorsOfInterest={user.majorsOfInterest} />
        </Col>
      </Row>
    </Fragment>
  );
}

ProfileInfo.propTypes = {
  admin: PropTypes.bool.isRequired,
  user: userShape,
};

ProfileInfo.defaultProps = {
  user: undefined,
};

export default withAuthorization(ProfileInfo);
