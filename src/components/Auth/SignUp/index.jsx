import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import SignUpForm from '../../../containers/Auth/SignUp/Form';
import Title from '../../Layout/Title';
import ROUTES from '../../../routes';

const styles = {
  extra: {
    margin: '15px 0 0 0',
    textAlign: 'center',
  },
};

function SignUp({ intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <Title>{t({ id: 'sessions.signUp' })}</Title>

      <Row type="flex" justify="center">
        <Col sm={24} lg={12} xl={10}>
          <SignUpForm />

          <p style={styles.extra}>
            <Link to={ROUTES.SIGN_IN} href={ROUTES.SIGN_IN}>
              {t({ id: 'sessions.orSignIn' })}
            </Link>
          </p>
        </Col>
      </Row>
    </Fragment>
  );
}

SignUp.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SignUp);
