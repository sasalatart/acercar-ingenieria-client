import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import ROUTES from '../../routes';
import SignUpForm from '../../containers/SignUp/Form';
import { themeStyles } from '../../theme';

const styles = {
  title: themeStyles.title,
  extra: {
    margin: '15px 0 0 0',
    textAlign: 'center',
  },
};

function SignUp({ intl: { formatMessage: t } }) {
  return (
    <div>
      <h1 style={styles.title}>{t({ id: 'routing.signUp' })}</h1>

      <Row type="flex" justify="center">
        <Col sm={24} lg={12} xl={10}>
          <SignUpForm />

          <p style={styles.extra}>
            <Link to={ROUTES.SIGN_IN} href={ROUTES.SIGN_IN}>
              {t({ id: 'auth.orSignIn' })}
            </Link>
          </p>
        </Col>
      </Row>
    </div>
  );
}

SignUp.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SignUp);