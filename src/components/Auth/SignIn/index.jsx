import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';
import SignInForm from '../../../containers/Auth/SignIn/Form';
import Title from '../../Layout/Title';
import routes from '../../../lib/routes';

const styles = {
  extra: {
    margin: '15px 0 0 0',
    textAlign: 'center',
  },
};

export default function SignIn() {
  return (
    <Fragment>
      <Title><FormattedMessage id="sessions.signIn" /></Title>

      <Row type="flex" justify="center">
        <Col sm={24} lg={12} xl={10}>
          <SignInForm />

          <p style={styles.extra}>
            <Link to={routes.signUp} href={routes.signUp}>
              <FormattedMessage id="sessions.orSignUp" />
            </Link>
          </p>
          <p style={styles.extra}>
            <Link to={routes.passwordRecovery} href={routes.passwordRecovery}>
              <FormattedMessage id="sessions.forgotPassword" />
            </Link>
          </p>
        </Col>
      </Row>
    </Fragment>
  );
}
