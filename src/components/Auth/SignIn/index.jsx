import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import SignInForm from '../../../containers/Auth/SignIn/Form';
import Title from '../../Layout/Title';
import ROUTES from '../../../routes';

const styles = {
  extra: {
    margin: '15px 0 0 0',
    textAlign: 'center',
  },
};

function SignIn({ intl: { formatMessage: t } }) {
  return (
    <div>
      <Title text={t({ id: 'sessions.signIn' })} />

      <Row type="flex" justify="center">
        <Col sm={24} lg={12} xl={10}>
          <SignInForm />

          <p style={styles.extra}>
            <Link to={ROUTES.SIGN_UP} href={ROUTES.SIGN_UP}>
              {t({ id: 'sessions.orSignUp' })}
            </Link>
          </p>
          <p style={styles.extra}>
            <Link to={ROUTES.RECOVER_PASSWORD} href={ROUTES.RECOVER_PASSWORD}>
              {t({ id: 'sessions.forgotPassword' })}
            </Link>
          </p>
        </Col>
      </Row>
    </div>
  );
}

SignIn.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SignIn);
