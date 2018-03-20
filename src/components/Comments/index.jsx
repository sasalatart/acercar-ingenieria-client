import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Divider } from 'antd';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import Form from '../../containers/Comments/Form';
import List from '../../containers/Comments/List';

function CommentsSection({
  baseResourceName, baseResourceId, withActionBar, intl: { formatMessage: t },
}) {
  const commonProps = { baseResourceName, baseResourceId };

  return (
    <div>
      {withActionBar && <ActionBar />}
      <Title text={t({ id: 'comments' })} />

      <Form {...commonProps} />
      <Divider />
      <List {...commonProps} />
    </div>
  );
}

CommentsSection.propTypes = {
  baseResourceName: PropTypes.string.isRequired,
  baseResourceId: PropTypes.number.isRequired,
  withActionBar: PropTypes.bool,
  intl: intlShape.isRequired,
};

CommentsSection.defaultProps = {
  withActionBar: false,
};

export default injectIntl(CommentsSection);
