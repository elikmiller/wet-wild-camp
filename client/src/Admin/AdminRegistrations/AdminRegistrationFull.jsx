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
    confirmMessage: false,
    formValue: "",
    showError: false,
    errors: {}
  };

  componentDidMount() {
    this.getRegistration();
  }

  getRegistration = () => {
    appClient
      .adminGetRegistration(this.props.match.params.registrationId)
      .then(res => {
        this.setState({
          registration: res
        });
      });
  };

  toggleForm = () => {
    this.setState({
      formValue: "",
      formOpen: !this.state.formOpen,
      showError: false
    });
  };

  toggleConfirm = () => {
    this.setState({
      confirmMessage: !this.state.confirmMessage
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
    let data = Object.assign({}, this.state.registration);
    if (formValue === "") {
      this.setState({ showError: true });
    } else {
      data.deposit = false;
      data.paid = false;
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
      .adminUpdateRegistration(this.state.registration._id, data)
      .then(() => {
        this.getRegistration();
      })
      .catch(err => {
        console.error(err);
      });
  };

  deleteRegistration = () => {
    appClient
      .adminDeleteRegistration(this.state.registration._id)
      .then(() => {
        this.props.history.push("/admin/registrations");
      })
      .catch(err => {
        this.toggleConfirm();
        this.setState({
          errors: { delete: err.response.data.message }
        });
      });
  };

  render() {
    let { registration } = this.state;
    let { camp, camper, user } = registration;
    return (
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <p className="card-text mb-0">
            {camper.firstName} {camper.lastName} - {camp.name}{" "}
            {_.capitalize(camp.type)}
          </p>
          <button
            className="btn btn-danger btn-sm"
            onClick={this.toggleConfirm}
          >
            <i className="fas fa-trash" /> Delete
          </button>
        </div>
        <div className="card-body">
          {this.state.confirmMessage && (
            <div
              className="alert alert-info d-flex justify-content-between align-items-center"
              role="alert"
            >
              Are you sure you want to delete this registration?
              <div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={this.toggleConfirm}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger btn-sm mb-0 ml-1"
                  onClick={this.deleteRegistration}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          {this.state.errors.delete && (
            <div className="alert alert-danger" role="alert">
              {this.state.errors.delete}
            </div>
          )}
          <p className="card-text">
            <Link to={`/admin/campers/${camper._id}`}>Camper Information</Link>
          </p>
          <p className="card-text">
            <strong>Associated Contact: </strong>
            <Link to={`/admin/users/${user._id}`}>
              {user.firstName} {user.lastName}
            </Link>
          </p>
          <p className="card-text mb-5">
            <strong>Payment Status: </strong>
            {registration.paid && (
              <span className="badge badge-success ml-1">Paid in Full</span>
            )}
            {registration.deposit && !registration.paid && (
              <span className="badge badge-warning ml-1">Deposit Paid</span>
            )}
            {!registration.paid && !registration.deposit && (
              <span className="badge badge-danger ml-1">Unpaid</span>
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
