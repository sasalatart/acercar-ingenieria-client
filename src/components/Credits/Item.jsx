import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List, Card, Icon } from 'antd';
import WithAuthorization from '../../hoc/WithAuthorization';
import DestroyButton from '../../containers/DestroyButton';
import { creditShape } from '../../shapes';

const { Item } = List;
const { Meta } = Card;

const styles = {
  card: {
    margin: '16px',
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
    const editButton = <Icon type="edit" onClick={() => onEditClicked(id)} />;
    actions.push(editButton);

    const destroyButton = <DestroyButton collection="credits" id={id} iconOnly />;
    actions.push(destroyButton);
  }

  const imageTag = <img alt={`credit-${id}`} src={resource.medium} />;
  const title = <a href={resourceUrl} target="_blank">{resourceName}</a>;
  return (
    <Item>
      <Card cover={imageTag} actions={actions} style={styles.card}>
        <Meta title={title} description={t({ id: 'credits.by' }, { authorName })} />
      </Card>
    </Item>
  );
}

CreditItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  credit: creditShape.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(CreditItem));
