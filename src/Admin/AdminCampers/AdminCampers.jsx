import React, { Component } from "react";
import appClient from "../../appClient";
import handleSort from "../../sort";
import AdminCamperCell from "./AdminCamperCell";

class AdminCampers extends Component {
  state = {
    campers: [],
    sortStatus: {
      firstName: {
        engaged: false,
        ascending: true
      },
      lastName: {
        engaged: false,
        ascending: true
      },
      dateOfBirth: {
        engaged: false,
        ascending: true
      }
    }
  };

  componentDidMount() {
    this.refreshCampers();
  }

  refreshCampers = () => {
    appClient
      .getAllCampers()
      .then(campers => {
        this.setState({
          campers: campers.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleCamperSort = e => {
    e.preventDefault();
    let sortedData = handleSort(e, this.state.campers, this.state.sortStatus);
    this.setState({
      campers: sortedData.data,
      sortStatus: sortedData.sortStatus
    });
  };

  render() {
    let content = this.state.campers.map((camper, i) => {
      return <AdminCamperCell key={i} data={camper} />;
    });
    return (
      <table className="table table-sm admin-table">
        <thead>
          <tr>
            <td>
              <button
                className="btn btn-light btn-sm"
                onClick={this.handleCamperSort}
                id="firstName"
                value="firstName"
              >
                First Name
              </button>
            </td>
            <td>
              <button
                className="btn btn-light btn-sm"
                onClick={this.handleCamperSort}
                id="lastName"
                value="lastName"
              >
                Last Name
              </button>
            </td>
            <td>
              <button
                className="btn btn-light btn-sm"
                onClick={this.handleCamperSort}
                id="dateOfBirth"
                value="dateOfBirth"
              >
                Age
              </button>
            </td>
            <td />
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    );
  }
}

export default AdminCampers;
