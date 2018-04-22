import React, { Component } from 'react';

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

    render() {
      return (
        <WrappedComponent
          {...this.props}
          formVisible={this.state.formVisible}
          editingId={this.state.editingId}
          onNewClicked={this.handleNewClicked}
          onEditClicked={this.handleEditClicked}
          onFormClose={this.handleFormClose}
        />
      );
    }
  };
}
