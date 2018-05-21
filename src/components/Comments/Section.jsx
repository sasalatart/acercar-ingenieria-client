import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Divider } from 'antd';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import Form from '../../containers/Comments/Form';
import List from '../../containers/Comments/List';

function CommentsSection({
  baseResourceName,
  baseResourceId,
  withActionBar,
  answers,
  reverseList,
  disabled,
  intl: { formatMessage: t },
}) {
  const commonProps = { baseResourceName, baseResourceId };

  return (
    <Fragment>
      {withActionBar && <ActionBar />}
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
  withActionBar: PropTypes.bool,
  reverseList: PropTypes.bool,
  answers: PropTypes.bool,
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
};

CommentsSection.defaultProps = {
  withActionBar: false,
  reverseList: false,
  answers: false,
  disabled: false,
};

export default injectIntl(CommentsSection);
