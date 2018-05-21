import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import Radium from 'radium';
import WithModalForm from '../../hoc/WithModalForm';
import Form from '../../containers/Credits/Form';
import ActionBar from './ActionBar';
import Title from '../Layout/Title';
import CreditItem from './Item';
import { creditShape } from '../../shapes';
import { breakpoints } from '../../theme';

const OBTAINED_FROM_LINK = <a href="https://thenounproject.com" taget="_blank">The Noun Project</a>;

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    [breakpoints.sm]: {
      justifyContent: 'center',
    },
  },
  obtainedFromWrapper: {
    marginBottom: '20px',
  },
};

class Credits extends Component {
  static propTypes = {
    credits: PropTypes.arrayOf(creditShape).isRequired,
    editingId: PropTypes.number,
    onNewClicked: PropTypes.func.isRequired,
    onEditClicked: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
    renderModal: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    editingId: undefined,
  }

  renderCredits() {
    const { credits, onEditClicked } = this.props;

    return (
      <div style={styles.wrapper}>
        {credits.map(credit =>
          <CreditItem key={credit.id} credit={credit} onEditClicked={onEditClicked} />)}
      </div>
    );
  }

  render() {
    const {
      editingId,
      onNewClicked,
      onFormClose,
      renderModal,
      intl: { formatMessage: t },
    } = this.props;

    const modalTitle = editingId ? t({ id: 'credits.edit' }) : t({ id: 'credits.new' });
    return (
      <Fragment>
        <ActionBar onNewClicked={onNewClicked} />
        <Title>{t({ id: 'credits' })}</Title>

        <div style={styles.obtainedFromWrapper}>
          <FormattedMessage id="credits.obtainedFrom" values={{ link: OBTAINED_FROM_LINK }} />
        </div>

        {this.renderCredits()}

        {renderModal(modalTitle, <Form id={editingId} onSubmitSuccess={onFormClose} />)}
      </Fragment>
    );
  }
}

export default WithModalForm(Radium(Credits));
