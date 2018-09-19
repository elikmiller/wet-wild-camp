import React, { Component } from "react";

class CamperCardForm extends Component {
  state = {
    formValues: {
      firstName: this.props.data.firstName,
      lastName: this.props.data.lastName,
      gender: this.props.data.gender,
      dateOfBirth: this.props.data.dateOfBirth.slice(0, 10),
      notes: this.props.data.notes
    }
  };

  handleChange = e => {
    e.preventDefault();
    let formValues = this.state.formValues;
    let id = e.target.id;
    let value = e.target.value;

    formValues[id] = value;
    this.setState({
      formValues: formValues
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let data = this.state.formValues;
    this.props.onSubmit(data);
  };

  handleClose = e => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    return (
      <div className="camper-card-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              id="firstName"
              type="input"
              className="form-control form-control-sm"
              onChange={this.handleChange}
              value={this.state.formValues["firstName"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              id="lastName"
              type="input"
              className="form-control form-control-sm"
              onChange={this.handleChange}
              value={this.state.formValues["lastName"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="custom-select"
              onChange={this.handleChange}
              value={this.state.formValues["gender"]}
            >
              <option defaultValue>Choose a gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unspecified">Unspecified</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="birth-date">Birth Date</label>
            <input
              id="dateOfBirth"
              type="date"
              className="form-control form-control-sm"
              onChange={this.handleChange}
              value={this.state.formValues["dateOfBirth"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="form-control form-control-sm"
              onChange={this.handleChange}
              value={this.state.formValues["notes"]}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <button className="btn btn-secondary" onClick={this.handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CamperCardForm;
