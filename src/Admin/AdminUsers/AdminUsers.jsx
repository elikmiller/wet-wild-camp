import React, { Component } from "react";
import appClient from "../../appClient";
import handleSort from "../../sort";
import AdminUserCell from "./AdminUserCell";

class AdminUsers extends Component {
  state = {
    users: [],
    sortStatus: {
      firstName: {
        engaged: false,
        ascending: true
      },
      lastName: {
        engaged: false,
        ascending: true
      },
      email: {
        engaged: false,
        ascending: true
      }
    }
  };

  componentDidMount() {
    this.refreshUsers();
  }

  refreshUsers = () => {
    appClient
      .getUsers()
      .then(users => {
        this.setState({ users: users.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleUserSort = e => {
    e.preventDefault();
    let sortedData = handleSort(e, this.state.users, this.state.sortStatus);
    this.setState({
      users: sortedData.data,
      sortStatus: sortedData.sortStatus
    });
  };

  render() {
    let content = this.state.users.map((user, i) => {
      return <AdminUserCell key={i} data={user} />;
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
                  id="firstName"
                  value="firstName"
                >
                  First Name
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="lastName"
                  value="lastName"
                >
                  Last Name
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="email"
                  value="email"
                >
                  Email
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

export default AdminUsers;
