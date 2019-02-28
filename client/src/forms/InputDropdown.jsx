import React, { Component } from "react";
import classNames from "classnames";

class InputDropdown extends Component {
  render() {
    let showError = this.props.wasValidated && this.props.error;
    let inputClassName = classNames("form-control form-control-sm", {
      "is-invalid": showError
    });
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <select
          className={inputClassName}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        >
          {this.props.placeholder && (
            <option value="">{this.props.placeholder}</option>
          )}
          {this.props.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {showError && <small className="text-danger">{this.props.error}</small>}
        <small className="form-text">{this.props.help}</small>
      </div>
    );
  }
}

export default InputDropdown;
