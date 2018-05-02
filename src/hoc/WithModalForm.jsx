import React, { Component } from 'react';
import { Modal } from 'antd';

export default function HOC(WrappedComponent) {
  return class WithModalForm extends Component {
    state = { formVisible: false };

    handleNewClicked = () => {
      this.setState({ formVisible: true });
    }

    handleEditClicked = (id) => {
      this.setState({ formVisible: true, editingId: id });
    }

    handleFormClose = () => {
      this.setState({ formVisible: false, editingId: undefined });
    }

    renderModal = (title, contents, footer = null) => (
      <Modal
        title={title}
        visible={this.state.formVisible}
        footer={footer}
        onCancel={this.handleFormClose}
        destroyOnClose
      >
        {contents}
      </Modal>
    )

    render() {
      return (
        <WrappedComponent
          {...this.props}
          formVisible={this.state.formVisible}
          editingId={this.state.editingId}
          onNewClicked={this.handleNewClicked}
          onEditClicked={this.handleEditClicked}
          onFormClose={this.handleFormClose}
          renderModal={this.renderModal}
        />
      );
    }
  };
}
