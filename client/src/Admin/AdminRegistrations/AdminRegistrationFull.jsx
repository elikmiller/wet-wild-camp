import React, { Component } from "react";
import appClient from "../../appClient";
import _ from "lodash";
import { Link } from "react-router-dom";

class AdminRegistrationFull extends Component {
  state = {
    registration: {
      camp: {},
      camper: {},
      user: {}
    },
    formOpen: false,
    formValue: "",
    showError: false
  };

  componentDidMount() {
    this.getRegistration();
  }

  getRegistration = () => {
    appClient
      .getRegistration(this.props.match.params.registrationId)
      .then(res => {
        this.setState({
          registration: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  toggleForm = () => {
    this.setState({
      formValue: "",
      formOpen: !this.state.formOpen,
      showError: false
    });
  };

  handleChange = e => {
    this.setState({
      formValue: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { formValue } = this.state;
    let data = {
      deposit: false,
      paid: false
    };
    if (formValue === "") {
      this.setState({ showError: true });
    } else {
      if (formValue === "deposit") {
        data.deposit = true;
      }
      if (formValue === "paid") {
        data.deposit = true;
        data.paid = true;
      }
      this.updateRegistration(data);
      this.toggleForm();
    }
  };

  updateRegistration = data => {
    appClient
      .updateRegistration(this.state.registration._id, data)
      .then(() => {
        this.getRegistration();
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let { registration } = this.state;
    let { camp, camper, user } = registration;
    return (
      <div className="card">
        <div className="card-header">
          {camper.firstName} {camper.lastName} - {camp.name}{" "}
          {_.capitalize(camp.type)}
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Associated Contact: </strong>
            <Link to={`/admin/users/${user._id}`}>
              {user.firstName} {user.lastName}
            </Link>
          </p>
          <p className="card-text mb-5">
            <strong>Payment Status: </strong>
            {registration.paid && (
              <span className="badge badge-success">Paid in Full</span>
            )}
            {registration.deposit && !registration.paid && (
              <span className="badge badge-warning">Deposit Paid</span>
            )}
            {!registration.paid && !registration.deposit && (
              <span className="badge badge-danger">Unpaid</span>
            )}
          </p>
          {!this.state.formOpen && (
            <button className="btn btn-primary" onClick={this.toggleForm}>
              Update Payment Info
            </button>
          )}
          {this.state.formOpen && (
            <form>
              <div className="form-group">
                <label htmlFor="paymentSelect">Update Payment Info</label>
                <select
                  value={this.state.formValue}
                  onChange={this.handleChange}
                  className="form-control"
                  id="paymentSelect"
                >
                  <option value="">Please select a payment option</option>
                  <option value="none">Unpaid</option>
                  <option value="deposit">Deposit Paid</option>
                  <option value="paid">Paid in Full</option>
                </select>
                {this.state.showError && (
                  <small className="text-danger">
                    Please select a valid option.
                  </small>
                )}
              </div>
              <div>
                <button
                  className="btn btn-secondary mr-3"
                  onClick={this.toggleForm}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default AdminRegistrationFull;
