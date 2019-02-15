import React, { Component } from "react";
import appClient from "../../appClient";
import handleSort from "../../sort";
import AdminUserCell from "./AdminUserCell";
import EmailContainer from "../../Email/EmailContainer";

class AdminUsers extends Component {
  state = {
    users: [],
    selectedEmails: [],
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
    appClient.adminGetUsers().then(res => {
      let users = res.filter(user => !user.admin);
      this.setState({ users });
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

  // When a box is checked, adds email to selected array
  handleSelect = email => {
    let emailArray = this.state.selectedEmails;
    emailArray.push(email);
    this.setState({
      selectedEmails: emailArray
    });
  };

  // When a box is unchecked, removes email from selected array
  handleDeselect = email => {
    let emailArray = this.state.selectedEmails;
    let index = emailArray.indexOf(email);
    if (index > -1) emailArray.splice(index, 1);
    this.setState({
      selectedEmails: emailArray
    });
  };

  // When select all is checked/unchecked, updates selected array. New array is sent to
  // each AdminUserCell
  handleSelectAll = e => {
    let { selectedEmails, users } = this.state;
    let allEmails = users.map(user => user.email);
    selectedEmails = e.target.checked ? allEmails : [];
    this.setState({ selectedEmails: selectedEmails });
  };

  deselectAll = () => {
    this.setState({
      selectedEmails: []
    });
  };

  render() {
    let content = this.state.users.map((user, i) => {
      return (
        <AdminUserCell
          key={i}
          data={user}
          handleSelect={this.handleSelect}
          handleDeselect={this.handleDeselect}
          selectedEmails={this.state.selectedEmails}
        />
      );
    });
    return (
      <div>
        <table className="table table-sm admin-table">
          <thead>
            <tr>
              <td style={{ minWidth: "20px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={
                    this.state.selectedEmails.length > 0 &&
                    this.state.selectedEmails.length === this.state.users.length
                  }
                  onChange={this.handleSelectAll}
                  style={{ marginLeft: "5px" }}
                />
              </td>
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
        <EmailContainer
          title={"Email Users"}
          emails={this.state.selectedEmails}
          onSuccess={this.deselectAll}
        />
      </div>
    );
  }
}

export default AdminUsers;
