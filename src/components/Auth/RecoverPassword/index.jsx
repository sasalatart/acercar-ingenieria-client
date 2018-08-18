import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';
import RecoverPasswordForm from '../../../containers/Auth/RecoverPassword/Form';
import Title from '../../Layout/Title';

export default function RecoverPassword() {
  return (
    <Fragment>
      <Title><FormattedMessage id="sessions.recoverPassword" /></Title>

      <Row type="flex" justify="center">
        <Col sm={24} lg={12} xl={10}>
          <RecoverPasswordForm />
        </Col>
      </Row>
    </Fragment>
  );
}
