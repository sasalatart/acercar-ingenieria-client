import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';
import Form from '../../containers/Credits/Form';
import Title from '../Layout/Title';
import ActionBar from './ActionBar';
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
    admin: PropTypes.bool.isRequired,
    credits: PropTypes.arrayOf(creditShape).isRequired,
    editingId: PropTypes.number,
    onNewClicked: PropTypes.func.isRequired,
    onEditClicked: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
    renderModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    editingId: undefined,
  }

  renderCredits() {
    const { admin, credits, onEditClicked } = this.props;

    return (
      <div style={styles.wrapper}>
        {credits.map(credit => (
          <CreditItem
            key={credit.id}
            admin={admin}
            credit={credit}
            onEditClicked={onEditClicked}
          />
        ))}
      </div>
    );
  }

  render() {
    const {
      editingId,
      onNewClicked,
      onFormClose,
      renderModal,
    } = this.props;

    return (
      <Fragment>
        <ActionBar onNewClicked={onNewClicked} />
        <Title><FormattedMessage id="credits" /></Title>

        <div style={styles.obtainedFromWrapper}>
          <FormattedMessage id="credits.obtainedFrom" values={{ link: OBTAINED_FROM_LINK }} />
        </div>

        {this.renderCredits()}

        {renderModal(
          <FormattedMessage id={editingId ? 'credits.edit' : 'credits.new'} />,
          <Form id={editingId} onSubmitSuccess={onFormClose} />,
        )}
      </Fragment>
    );
  }
}

export default Radium(Credits);
