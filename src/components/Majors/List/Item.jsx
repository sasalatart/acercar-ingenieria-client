import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import DestroyButton from '../../../containers/DestroyButton';
import MajorMeta from './Meta';
import EditIcon from '../../Icons/Edit';
import { majorShape } from '../../../shapes';
import routes from '../../../lib/routes';
import collections from '../../../lib/collections';

const { Item } = List;

function MajorItem({ admin, major, intl: { formatMessage: t } }) {
  const actions = [];

  if (admin) {
    const majorEditHref = routes.majorEdit(major.id);
    const editLink = <EditIcon to={majorEditHref} />;
    actions.push(editLink);

    const destroyButton = (
      <DestroyButton
        collection={collections.majors}
        id={major.id}
        warningMessage={t({ id: 'majors.destroyWarning' })}
        textToFill={major.name}
        important
        iconOnly
      />
    );
    actions.push(destroyButton);
  }

  return (
    <Item actions={actions}>
      <MajorMeta major={major} />
    </Item>
  );
}

MajorItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorItem);
