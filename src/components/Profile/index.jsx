import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import { userShape } from '../../shapes';
import ProfileCard from './Card';
import RolesList from './RolesList';
import MajorsList from './MajorsList';
import Spinner from '../Spinner';
import { themeStyles } from '../../theme';

const styles = {
  title: themeStyles.title,
  subtitle: themeStyles.subTitle,
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  divider: {
    marginTop: '50px',
  },
};

class Profile extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,
    user: userShape,
    loadUser: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    user: undefined,
  };

  componentWillMount() {
    this.props.loadUser(this.props.userId);
  }

  renderGenerationSpan() {
    const { user, intl: { formatMessage: t } } = this.props;
    return <span>{t({ id: 'profile.generation' }, { year: user.generation })}</span>;
  }

  renderJoinedSpan() {
    const { user, intl: { formatMessage: t } } = this.props;
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

  render() {
    const { user, intl: { formatMessage: t } } = this.props;

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
            {this.renderGenerationSpan()}, {this.renderJoinedSpan()}
          </h3>

          <Divider>Roles</Divider>
          <RolesList user={user} />

          <Divider style={styles.divider}>{t({ id: 'profile.majorsOfInterest' })}</Divider>
          <MajorsList majorSummaries={user.majorsOfInterest} />
        </Col>
      </Row>
    );
  }
}

export default Profile;
