import React, { Component } from "react";

class PrimaryContactInformationForm extends Component {
  render() {
    return (
      <div className="primary-contact-information-form">
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
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input id="address" type="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="address-2">Address (Line 2)</label>
            <input id="address-2" type="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input id="city" type="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input id="state" type="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code</label>
            <input id="zip" type="input" className="form-control" />
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

export default PrimaryContactInformationForm;
