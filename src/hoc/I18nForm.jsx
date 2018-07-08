import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';

export default function HOC(WrappedComponent, validators) {
  class I18nForm extends Component {
    static propTypes = {
      intl: intlShape.isRequired,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.intl.locale !== prevState.prevLocale) {
        return {
          validators: validators(nextProps.intl.formatMessage),
          prevLocale: nextProps.intl.locale,
        };
      }

      return null;
    }

    state = { validators: validators(this.props.intl.formatMessage) }

    render() {
      return <WrappedComponent {...this.props} validators={this.state.validators} />;
    }
  }

  return injectIntl(I18nForm);
}
