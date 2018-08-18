import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import Form from '../../containers/Majors/Form';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';

export default function NewMajor() {
  return (
    <Fragment>
      <ActionBar />
      <Title><FormattedMessage id="majors.new" /></Title>

      <Form />
    </Fragment>
  );
}
