import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import { TextArea, SubmitButton } from '../Forms';
import commentsValidations from '../../validations/comments';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    margin: 0,
  },
  submitButton: {
    minWidth: '150px',
    marginLeft: '5px',
  },
};

class CommentForm extends Component {
  static propTypes = {
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  componentWillMount() {
    this.setValidators(this.props.intl.formatMessage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.intl.locale !== this.props.intl.locale) {
      this.setValidators(nextProps.intl.formatMessage);
    }
  }

  setValidators(t) {
    this.setState({ validators: commentsValidations(t) });
  }

  render() {
    const {
      valid, submitting, handleSubmit, style, intl: { formatMessage: t },
    } = this.props;

    const { validators } = this.state;

    return (
      <form onSubmit={handleSubmit} style={{ ...styles.wrapper, ...style }}>
        <Field
          name="content"
          component={TextArea}
          placeholder={t({ id: 'forms.content' })}
          validate={[validators.required, validators.maxLength]}
          disabled={submitting}
          style={styles.content}
        />
        <SubmitButton
          disabled={!valid || submitting}
          loading={submitting}
          style={styles.submitButton}
        />
      </form>
    );
  }
}

export default CommentForm;
