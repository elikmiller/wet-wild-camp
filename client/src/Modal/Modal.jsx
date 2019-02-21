import React, { Component } from "react";
import ReactModal from "react-modal";
import "./Modal.css";

class Modal extends Component {
  componentDidMount() {
    ReactModal.setAppElement("body");
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        contentLabel={this.props.contentLabel}
        onRequestClose={this.props.onRequestClose}
        shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
        className="react-modal"
        overlayClassName="react-modal-overlay"
      >
        {this.props.children}
      </ReactModal>
    );
  }
}

export default Modal;
