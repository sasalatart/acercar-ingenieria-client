import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Modal } from 'antd';
import Form from '../../containers/Search/Form';

const styles = {
  button: {
    margin: '0 5px',
  },
};

class SearchButton extends Component {
  static propTypes = {
    filtersActive: PropTypes.bool.isRequired,
    removeFilter: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  state = { formVisible: false }

  handleOpenModal = () => {
    this.setState({ formVisible: true });
  }

  handleCloseModal = () => {
    this.setState({ formVisible: false });
  }

  render() {
    const {
      filtersActive,
      removeFilter,
      intl: { formatMessage: t },
      ...restProps
    } = this.props;
    const { formVisible } = this.state;

    const title = t({ id: 'search' });

    return (
      <span>
        <Button type="primary" icon="search" onClick={this.handleOpenModal} style={styles.button}>
          {title}
        </Button>

        {filtersActive &&
          <Button onClick={removeFilter} style={styles.button}>
            {t({ id: 'search.reset' })}
          </Button>
        }

        <Modal
          title={title}
          visible={formVisible}
          footer={null}
          onCancel={this.handleCloseModal}
          destroyOnClose
        >
          <Form {...restProps} onSubmitSuccess={this.handleCloseModal} />
        </Modal>
      </span>
    );
  }
}

export default injectIntl(SearchButton);
