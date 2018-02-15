import React from 'react';
import { injectIntl, FormattedDate, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import { userShape } from '../../../shapes';
import ProfileCard from '../Card';
import RolesList from './RolesList';
import MajorsList from './MajorsList';
import Spinner from '../../Spinner';
import { themeStyles } from '../../../theme';

const styles = {
  title: themeStyles.title,
  subtitle: themeStyles.subTitle,
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

function renderGenerationSpan(user, t) {
  return <span>{t({ id: 'profile.generation' }, { year: user.generation })}</span>;
}

function renderJoinedSpan(user, t) {
  const formattedDate = (
    <FormattedDate
      value={new Date(user.createdAt)}
      year="2-digit"
      month="2-digit"
      day="2-digit"
    />
  );

  return <span>{t({ id: 'profile.joined' })} {formattedDate}</span>;
}

function ProfileInfo({ user, intl: { formatMessage: t } }) {
  if (!user) {
    return <Spinner />;
  }

  return (
    <Row type="flex" justify="center" gutter={8}>
      <Col md={6}>
        <div style={styles.cardWrapper}>
          <ProfileCard user={user} />
        </div>
      </Col>
      <Col md={18}>
        <h1 style={styles.title}>{user.firstName} {user.lastName}</h1>
        <h3 style={styles.subtitle}>
          {renderGenerationSpan(user, t)}, {renderJoinedSpan(user, t)}
        </h3>

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
