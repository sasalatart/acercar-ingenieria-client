import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Divider } from 'antd';
import Title from '../Layout/Title';
import Form from '../../containers/Comments/Form';
import List from '../../containers/Comments/List';

function CommentsSection({
  baseResourceName,
  baseResourceId,
  answers,
  reverseList,
  disabled,
  intl: { formatMessage: t },
}) {
  const commonProps = { baseResourceName, baseResourceId };

  return (
    <Fragment>
      <Title>{t({ id: answers ? 'answers' : 'comments' })}</Title>

      {!disabled &&
        <Fragment>
          <Form {...commonProps} reverseList={reverseList} />
          <Divider />
        </Fragment>
      }
      <List {...commonProps} answeringDisabled={answers} disabled={disabled} />
    </Fragment>
  );
}

CommentsSection.propTypes = {
  baseResourceName: PropTypes.string.isRequired,
  baseResourceId: PropTypes.number.isRequired,
  reverseList: PropTypes.bool,
  answers: PropTypes.bool,
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
};

CommentsSection.defaultProps = {
  reverseList: false,
  answers: false,
  disabled: false,
};

export default injectIntl(CommentsSection);
