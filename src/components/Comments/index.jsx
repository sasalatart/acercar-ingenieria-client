import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Divider } from 'antd';
import NewForm from '../../containers/Comments/NewForm';
import List from '../../containers/Comments/List';

function CommentsSection({ baseResourceName, baseResourceId, intl: { formatMessage: t } }) {
  const commonProps = { baseResourceName, baseResourceId };

  return (
    <div>
      <h1>{t({ id: 'comments' })}</h1>
      <NewForm {...commonProps} />
      <Divider />
      <List {...commonProps} />
    </div>
  );
}

CommentsSection.propTypes = {
  baseResourceName: PropTypes.string.isRequired,
  baseResourceId: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentsSection);
