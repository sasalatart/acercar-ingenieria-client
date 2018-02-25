import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import ROUTES from '../../routes';
import SignInForm from '../../containers/SignIn/Form';
import Title from '../Layout/Title';

const styles = {
  extra: {
    margin: '15px 0 0 0',
    textAlign: 'center',
  },
};

function SignIn({ intl: { formatMessage: t } }) {
  return (
    <div>
      <Title text={t({ id: 'routing.signIn' })} />

      <Row type="flex" justify="center">
        <Col sm={24} lg={12} xl={10}>
          <SignInForm />

          <p style={styles.extra}>
            <Link to={ROUTES.SIGN_UP} href={ROUTES.SIGN_UP}>
              {t({ id: 'auth.orSignUp' })}
            </Link>
          </p>
          <p style={styles.extra}>
            <Link to={ROUTES.SIGN_UP} href={ROUTES.SIGN_UP}>
              {t({ id: 'auth.forgotPassword' })}
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
