import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';
import SignUpForm from '../../../containers/Auth/SignUp/Form';
import Title from '../../Layout/Title';
import routes from '../../../lib/routes';

const styles = {
  extra: {
    margin: '15px 0 0 0',
    textAlign: 'center',
  },
};

export default function SignUp() {
  return (
    <Fragment>
      <Title><FormattedMessage id="sessions.signUp" /></Title>

      <Row type="flex" justify="center">
        <Col sm={24} lg={12} xl={10}>
          <SignUpForm />

          <p style={styles.extra}>
            <Link to={routes.signIn} href={routes.signIn}>
              <FormattedMessage id="sessions.orSignIn" />
            </Link>
          </p>
        </Col>
      </Row>
    </Fragment>
  );
}
