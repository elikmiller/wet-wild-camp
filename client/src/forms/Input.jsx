import React, { Component } from "react";
import classNames from "classnames";

class Input extends Component {
  render() {
    let showError = this.props.wasValidated && this.props.error;
    let inputClassName = classNames("form-control", {
      "is-invalid": showError
    });
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input
          className={inputClassName}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
        {showError && <small className="text-danger">{this.props.error}</small>}
        <small className="form-text">{this.props.help}</small>
      </div>
    );
  }
}

export default Input;
