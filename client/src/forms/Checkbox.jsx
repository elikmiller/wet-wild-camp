import React, { Component } from "react";
import classNames from "classnames";

class Checkbox extends Component {
  render() {
    let showError = this.props.wasValidated && this.props.error;
    let inputClassName = classNames("form-check-input", {
      "is-invalid": showError
    });
    return (
      <div className="form-check">
        <input
          name={this.props.name}
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          className={inputClassName}
        />
        <label className="form-check-label">{this.props.label}</label>
        {showError && <small className="text-danger">{this.props.error}</small>}
        <small className="form-text">{this.props.help}</small>
      </div>
    );
  }
}

export default Checkbox;
