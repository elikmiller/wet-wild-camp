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
    }
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
          <p className="card-text">
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
        </div>
      </div>
    );
  }
}

export default AdminRegistrationFull;
