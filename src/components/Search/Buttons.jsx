import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithModal from '../../hoc/WithModal';
import HideableButton from '../HideableButton';
import Form from '../../containers/Search/Form';

const styles = {
  button: {
    margin: '0 5px',
  },
};

function SearchButton({
  filtersActive,
  removeFilter,
  onModalOpen,
  onModalClose,
  renderModal,
  intl: { formatMessage: t },
  ...restProps
}) {
  const title = t({ id: 'search' });

  return (
    <span>
      <HideableButton type="primary" icon="search" onClick={onModalOpen} style={styles.button}>
        {title}
      </HideableButton>

      {filtersActive &&
        <HideableButton icon="close" onClick={removeFilter} style={styles.button}>
          {t({ id: 'search.reset' })}
        </HideableButton>
      }

      {renderModal(title, <Form {...restProps} onSubmitSuccess={onModalClose} />)}
    </span>
  );
}

SearchButton.propTypes = {
  filtersActive: PropTypes.bool.isRequired,
  removeFilter: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  renderModal: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithModal(SearchButton));
