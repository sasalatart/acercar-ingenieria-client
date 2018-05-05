import React from 'react';
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
  intl: { formatMessage: t },
}) {
  const commonProps = { baseResourceName, baseResourceId };

  return (
    <div>
      {withActionBar && <ActionBar />}
      <Title>{t({ id: answers ? 'answers' : 'comments' })}</Title>

      <Form {...commonProps} reverseList={reverseList} />
      <Divider />
      <List {...commonProps} answeringDisabled={answers} />
    </div>
  );
}

CommentsSection.propTypes = {
  baseResourceName: PropTypes.string.isRequired,
  baseResourceId: PropTypes.number.isRequired,
  withActionBar: PropTypes.bool,
  reverseList: PropTypes.bool,
  answers: PropTypes.bool,
  intl: intlShape.isRequired,
};

CommentsSection.defaultProps = {
  withActionBar: false,
  reverseList: false,
  answers: false,
};

export default injectIntl(CommentsSection);
