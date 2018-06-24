import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List, Icon } from 'antd';
import DestroyButton from '../../../containers/DestroyButton';
import MajorMeta from './Meta';
import { majorShape } from '../../../shapes';
import routes from '../../../lib/routes';
import collections from '../../../lib/collections';

const { Item } = List;

function MajorItem({ admin, major, intl: { formatMessage: t } }) {
  const actions = [];

  if (admin) {
    const majorEditHref = routes.majorEdit(major.id);
    actions.push(<Link to={majorEditHref} href={majorEditHref}><Icon type="edit" /></Link>);

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
