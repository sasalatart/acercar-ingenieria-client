import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Divider } from 'antd';
import Title from '../Layout/Title';
import Form from '../../containers/Comments/Form';
import List from '../../containers/Comments/List';

const styles = {
  toggleButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class CommentsSection extends Component {
  static propTypes = {
    baseResourceName: PropTypes.string.isRequired,
    baseResourceId: PropTypes.number.isRequired,
    answersList: PropTypes.bool,
    toggable: PropTypes.bool,
    disabled: PropTypes.bool,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    answersList: false,
    toggable: false,
    disabled: false,
  };

  state = { visible: !this.props.toggable };

  handleSetVisible = () => this.setState({ visible: true });

  renderTitleText() {
    const { answersList, intl: { formatMessage: t } } = this.props;
    return t({ id: answersList ? 'answers' : 'comments' });
  }

  renderToggleButton() {
    return (
      <div style={styles.toggleButtonWrapper}>
        <Button onClick={this.handleSetVisible} size="large" type="primary">
          {this.renderTitleText()}
        </Button>
      </div>
    );
  }

  render() {
    const {
      baseResourceName,
      baseResourceId,
      answersList,
      disabled,
    } = this.props;

    if (!this.state.visible) return this.renderToggleButton();

    const commonProps = { baseResourceName, baseResourceId };
    return (
      <Fragment>
        <Title>{this.renderTitleText()}</Title>

        {!disabled &&
          <Fragment>
            <Form {...commonProps} reverseList={answersList} />
            <Divider />
          </Fragment>
        }
        <List {...commonProps} answeringDisabled={answersList} disabled={disabled} />
      </Fragment>
    );
  }
}

export default injectIntl(CommentsSection);
