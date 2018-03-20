import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';

export default function HOC(WrappedComponent, validators) {
  class I18nForm extends Component {
    static propTypes = {
      intl: intlShape.isRequired,
    }

    state = { validators: validators(this.props.intl.formatMessage) }

    componentWillReceiveProps(nextProps) {
      if (nextProps.intl.locale !== this.props.intl.locale) {
        this.setValidators(nextProps.intl.formatMessage);
      }
    }

    setValidators(t) {
      this.setState({ validators: validators(t) });
    }

    render() {
      return <WrappedComponent {...this.props} validators={this.state.validators} />;
    }
  }

  return injectIntl(I18nForm);
}
