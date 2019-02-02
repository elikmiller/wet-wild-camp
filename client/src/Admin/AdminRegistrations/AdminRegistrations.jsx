import React, { Component } from "react";
import appClient from "../../appClient";
import AdminRegistrationCell from "./AdminRegistrationCell";
import handleSort from "../../sort";

class AdminRegistrations extends Component {
  state = {
    registrations: [],
    sortStatus: {
      user: {
        engaged: false,
        ascending: true
      },
      camp: {
        engaged: false,
        ascending: true
      },
      camper: {
        engaged: false,
        ascending: true
      },
      date: {
        engaged: false,
        ascending: true
      },
      paid: {
        engaged: false,
        ascending: true
      }
    }
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

  handleUserSort = e => {
    e.preventDefault();
    let sortedData = handleSort(
      e,
      this.state.registrations,
      this.state.sortStatus
    );
    this.setState({
      registrations: sortedData.data,
      sortStatus: sortedData.sortStatus
    });
  };

  render() {
    let content = this.state.registrations.map((registration, i) => {
      return <AdminRegistrationCell key={i} data={registration} />;
    });
    return (
      <div>
        <table className="table table-sm admin-table">
          <thead>
            <tr>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="user"
                  value="lastName"
                >
                  User
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="camp"
                  value="name"
                >
                  Camp Session
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="camper"
                  value="lastName"
                >
                  Camper
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="camp"
                  value="startDate"
                >
                  Start Date
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="paid"
                  value="paid"
                >
                  Payment Status
                </button>
              </td>
              <td />
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default AdminRegistrations;
