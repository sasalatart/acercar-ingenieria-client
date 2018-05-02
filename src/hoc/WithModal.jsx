import React, { Component } from 'react';
import { Modal } from 'antd';

export default function HOC(WrappedComponent) {
  return class WithModal extends Component {
    state = { modalVisible: false };

    handleOpen = () => {
      this.setState({ modalVisible: true });
    }

    handleClose = () => {
      this.setState({ modalVisible: false });
    }

    renderModal = (title, contents, footer = null) => (
      <Modal
        title={title}
        visible={this.state.modalVisible}
        footer={footer}
        onCancel={this.handleClose}
        destroyOnClose
      >
        {contents}
      </Modal>
    )

    render() {
      return (
        <WrappedComponent
          {...this.props}
          modalVisible={this.state.modalVisible}
          onModalOpen={this.handleOpen}
          onModalClose={this.handleClose}
          renderModal={this.renderModal}
        />
      );
    }
  };
}
