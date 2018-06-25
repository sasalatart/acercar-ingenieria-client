import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Card } from 'antd';
import DestroyButton from '../../containers/DestroyButton';
import Image from '../Image';
import EditIcon from '../Icons/Edit';
import { creditShape } from '../../shapes';
import collections from '../../lib/collections';

const { Meta } = Card;

const styles = {
  card: {
    margin: '16px',
    width: '200px',
  },
};

function CreditItem({
  admin,
  credit: {
    id,
    resourceName,
    resourceUrl,
    authorName,
    resource,
  },
  onEditClicked,
  intl: { formatMessage: t },
}) {
  const actions = [];
  if (admin) {
    const editButton = <EditIcon onClick={() => onEditClicked(id)} />;
    actions.push(editButton);

    const destroyButton = <DestroyButton collection={collections.credits} id={id} iconOnly />;
    actions.push(destroyButton);
  }

  const imageTag = <Image src={resource.medium} />;
  const title = <a href={resourceUrl} target="_blank">{resourceName}</a>;
  return (
    <Card cover={imageTag} actions={actions} style={styles.card}>
      <Meta title={title} description={t({ id: 'credits.by' }, { authorName })} />
    </Card>
  );
}

CreditItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  credit: creditShape.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CreditItem);
