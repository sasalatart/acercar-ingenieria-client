import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import DataPlaceholder from '../components/Layout/DataPlaceholder';

export default function HOC(fetchFnName, resourceName) {
  return WrappedComponent =>
    class WithLoadableResource extends Component {
      static propTypes = {
        loading: PropTypes.bool.isRequired,
      }

      componentDidMount() {
        this.props[fetchFnName]();
      }

      render() {
        const { loading, ...restProps } = this.props;

        const noData = !loading && isEmpty(this.props[resourceName]);

        return loading || noData
          ? <DataPlaceholder noData={noData} absolute />
          : <WrappedComponent {...restProps} />;
      }
    };
}
