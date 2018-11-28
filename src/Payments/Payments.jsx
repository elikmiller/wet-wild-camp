import React, { Component } from "react";
import { AuthContext } from "../App";
import appClient from "../appClient";
import paypalButton from "../images/paypal-logo.png";
import "./Payments.css";

class Payments extends Component {
  state = {
    registrations: [],
    selectedRegistrations: [],
    total: 0
  };

  componentDidMount() {
    this.updateRegistrations();
  }

  // Gets all unpaid registrations for the current user and adds them to state
  updateRegistrations = () => {
    appClient
      .getUserRegistrations(this.props.userId)
      .then(res => {
        let unpaidRegistrations = [];
        res.data.forEach(registration => {
          if (!registration.paid) unpaidRegistrations.push(registration);
        });
        this.setState({
          registrations: unpaidRegistrations
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  // calls POST payment route, gets the redirect route from the returned data,
  // and redirects the browser to PayPal's checkout flow
  handlePaypal = e => {
    e.preventDefault();
    let registrationIds = this.state.selectedRegistrations.map(reg => {
      return reg._id;
    });
    appClient
      .addPayment(this.props.userId, {
        paymentAmount: this.state.total,
        registrations: registrationIds
      })
      .then(res => {
        res.data.links.forEach(link => {
          if (link.method === "REDIRECT") {
            window.location.href = link.href;
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Adds or removes registration from state when checkboxes are clicked and
  // recalculates the total
  handleChange = e => {
    let { selectedRegistrations } = this.state;
    let parsedValue = JSON.parse(e.target.value);

    let index = selectedRegistrations.findIndex(i => i._id === parsedValue._id);
    if (index !== -1) selectedRegistrations.splice(index, 1);
    else selectedRegistrations.push(parsedValue);
    this.setState({
      selectedRegistrations: selectedRegistrations
    });
    this.calculateTotal(selectedRegistrations);
  };

  // Selects or deselects all checkboxes and updates list of registrations
  // and total in state accordingly
  handleSelectAll = e => {
    let { registrations } = this.state;
    let registrationList = [];
    registrations.forEach((registration, i) => {
      this.refs[`${i}`].checked = e.target.checked;
      registrationList.push(registration);
    });
    this.setState({
      selectedRegistrations: e.target.checked ? registrationList : []
    });
    this.calculateTotal(e.target.checked ? registrationList : []);
  };

  // Calculates the total from an array of registrations and sets it in state
  calculateTotal = arr => {
    let total = 0;
    arr.forEach(registration => {
      total = total + registration.camp.fee;
    });
    this.setState({
      total: total
    });
  };

  render() {
    // Generates the list of registrations with checkboxes
    let content = this.state.registrations.map((reg, i) => {
      let type =
        reg.camp.type.charAt(0).toUpperCase() + reg.camp.type.substr(1);
      return (
        <tr key={i}>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              onChange={this.handleChange}
              ref={i}
              value={JSON.stringify(reg)}
              style={{ marginLeft: "5px" }}
            />
          </td>
          <td>{reg.camp.name}</td>
          <td>{type}</td>
          <td>
            {reg.camper.firstName} {reg.camper.lastName}
          </td>
          <td>${reg.camp.fee}</td>
        </tr>
      );
    });
    return (
      <div>
        <table className="table table-sm">
          <thead>
            <tr>
              <td style={{ minWidth: "20px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={this.handleSelectAll}
                  style={{ marginLeft: "5px" }}
                />
              </td>
              <th>Camp Session</th>
              <th>Camp</th>
              <th>Camper</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        <h1>Total: ${this.state.total}</h1>
        <button id="paypal-button" onClick={this.handlePaypal}>
          <img src={paypalButton} alt="paypal logo" />
        </button>
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Payments userId={auth.userId} {...props} />}
  </AuthContext.Consumer>
);
