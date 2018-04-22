import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import { List, Modal } from 'antd';
import WithModalForm from '../../hoc/WithModalForm';
import Form from '../../containers/Credits/Form';
import ActionBar from './ActionBar';
import Title from '../Layout/Title';
import CreditItem from './Item';
import { creditShape } from '../../shapes';

const OBTAINED_FROM_LINK = <a href="https://thenounproject.com" taget="_blank">The Noun Project</a>;

const styles = {
  obtainedFromWrapper: {
    marginBottom: '20px',
  },
};

const listGridSettings = { xs: 1, sm: 2, md: 4 };

class Credits extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    credits: PropTypes.arrayOf(creditShape).isRequired,
    formVisible: PropTypes.bool.isRequired,
    editingId: PropTypes.number,
    onNewClicked: PropTypes.func.isRequired,
    onEditClicked: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
    loadCredits: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    editingId: undefined,
  }

  componentDidMount() {
    this.props.loadCredits();
  }

  renderFormModal() {
    const {
      formVisible,
      editingId,
      onFormClose,
      intl: { formatMessage: t },
    } = this.props;

    return (
      <Modal
        title={editingId ? t({ id: 'credits.edit' }) : t({ id: 'credits.new' })}
        visible={formVisible}
        footer={null}
        onCancel={onFormClose}
        destroyOnClose
      >
        <Form id={editingId} onSubmitSuccess={onFormClose} />
      </Modal>
    );
  }

  render() {
    const {
      loading,
      credits,
      onNewClicked,
      onEditClicked,
      intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <ActionBar onNewClicked={onNewClicked} />
        <Title text={t({ id: 'credits' })} />

        <div style={styles.obtainedFromWrapper}>
          <FormattedMessage id="credits.obtainedFrom" values={{ link: OBTAINED_FROM_LINK }} />
        </div>

        <List
          grid={listGridSettings}
          loading={loading}
          dataSource={credits}
          renderItem={credit => <CreditItem credit={credit} onEditClicked={onEditClicked} />}
        />
        {this.renderFormModal()}
      </div>
    );
  }
}

export default WithModalForm(Credits);
