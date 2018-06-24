import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import withModal from '../../hoc/withModal';
import HideableButton from '../HideableButton';
import Form from '../../containers/Search/Form';
import { breakpoints } from '../../theme';

const styles = {
  button: {
    margin: '0 5px',
    [breakpoints.sm]: {
      margin: '0 1px',
    },
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
    <Fragment>
      <HideableButton type="primary" icon="search" onClick={onModalOpen} style={styles.button}>
        {title}
      </HideableButton>

      {filtersActive &&
        <HideableButton icon="close" onClick={removeFilter} style={styles.button}>
          {t({ id: 'search.reset' })}
        </HideableButton>
      }

      {renderModal(title, <Form {...restProps} onSubmitSuccess={onModalClose} />)}
    </Fragment>
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

export default injectIntl(withModal(SearchButton));
