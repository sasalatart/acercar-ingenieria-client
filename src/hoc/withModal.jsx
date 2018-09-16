import React, { Component } from 'react';
import { Modal } from 'antd';

export default function HOC(WrappedComponent) {
  return class WithModal extends Component {
    state = { modalVisible: false };

    getHandleCancel(onCancel) {
      if (!onCancel) return this.handleClose;

      return () => {
        onCancel();
        this.handleClose();
      };
    }

    handleOpen = () => {
      this.setState({ modalVisible: true });
    }

    handleClose = () => {
      this.setState({ modalVisible: false });
    }

    renderModal = (title, contents, options = {}) => (
      <Modal
        title={title}
        visible={this.state.modalVisible}
        footer={options.footer || null}
        onCancel={this.getHandleCancel(options.onCancel)}
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
