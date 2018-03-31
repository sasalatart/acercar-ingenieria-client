import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import RecoverPasswordForm from '../../../containers/Auth/RecoverPassword/Form';
import Title from '../../Layout/Title';

function RecoverPassword({ intl: { formatMessage: t } }) {
  return (
    <div>
      <Title text={t({ id: 'sessions.recoverPassword' })} />

      <Row type="flex" justify="center">
        <Col sm={24} lg={12} xl={10}>
          <RecoverPasswordForm />
        </Col>
      </Row>
    </div>
  );
}

RecoverPassword.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(RecoverPassword);
