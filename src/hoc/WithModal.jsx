import React, { Component } from 'react';

export default function HOC(WrappedComponent) {
  return class WithModal extends Component {
    state = { modalVisible: false };

    handleOpen = () => {
      this.setState({ modalVisible: true });
    }

    handleClose = () => {
      this.setState({ modalVisible: false });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          modalVisible={this.state.modalVisible}
          onModalOpen={this.handleOpen}
          onModalClose={this.handleClose}
        />
      );
    }
  };
}
