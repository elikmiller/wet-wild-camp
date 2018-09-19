import React, { Component } from "react";

class EmergencyContactInformationForm extends Component {
  render() {
    return (
      <div className="emergency-contact-information-form">
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" type="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" type="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="input" className="form-control" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EmergencyContactInformationForm;
