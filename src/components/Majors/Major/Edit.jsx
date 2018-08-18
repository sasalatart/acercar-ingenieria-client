import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import ActionBar from '../../../containers/Layout/ActionBar';
import Form from '../../../containers/Majors/Form';
import Title from '../../Layout/Title';
import { majorShape } from '../../../shapes';

function MajorEdit({ major }) {
  return (
    <Fragment>
      <ActionBar />
      <Title><FormattedMessage id="majors.edit" /></Title>

      <Form major={major} />
    </Fragment>
  );
}

MajorEdit.propTypes = {
  major: majorShape.isRequired,
};

export default MajorEdit;
