import React, { Component } from "react";
import appClient from "../../appClient";
import AdminRegistrationCell from "./AdminRegistrationCell";

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
    let { id, value } = e.target;
    let { registrations, sortStatus } = this.state;
    // sort based on id and value properties of clicked button
    const sortedArray = registrations.sort((a, b) => {
      if (sortStatus[id]["ascending"]) {
        return a[id][value] > b[id][value];
      } else return b[id][value] > a[id][value];
    });
    // update values and set to state
    Object.entries(sortStatus).forEach(
      ([key, value]) => (value.engaged = false)
    );
    sortStatus[id]["engaged"] = true;
    sortStatus[id]["ascending"] = !sortStatus[id]["ascending"];
    this.setState({
      registrations: sortedArray,
      sortStatus: sortStatus
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
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default AdminRegistrations;
