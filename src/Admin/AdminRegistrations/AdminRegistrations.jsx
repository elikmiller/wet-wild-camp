import React, { Component } from "react";
import appClient from "../../appClient";
import AdminRegistrationCell from "./AdminRegistrationCell";

class AdminRegistrations extends Component {
  state = {
    registrations: []
  };

  componentDidMount() {
    this.refreshRegistrations();
  }

  refreshRegistrations = () => {
    appClient
      .getRegistrations()
      .then(registrations => {
        this.setState({
          registrations: registrations.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let content = this.state.registrations.map((registration, i) => {
      return <AdminRegistrationCell key={i} data={registration} />;
    });
    return (
      <div>
        <table className="table table-sm">
          <thead>
            <tr>
              <td>User</td>
              <td>Camp Session</td>
              <td>Camper</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default AdminRegistrations;
