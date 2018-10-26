import React, { Component } from "react";
import appClient from "../../appClient";
import handleSort from "../../sort";
import AdminSessionCell from "./AdminSessionCell";
import AdminSessionForm from "./AdminSessionForm";

class AdminSessions extends Component {
  state = {
    camps: [],
    sortStatus: {
      name: {
        engaged: false,
        ascending: true
      },
      type: {
        engaged: false,
        ascending: true
      },
      startDate: {
        engaged: false,
        ascending: true
      }
    },
    formOpen: false
  };

  componentDidMount() {
    this.refreshCamps();
  }

  refreshCamps = () => {
    appClient
      .getCamps()
      .then(camps => {
        this.setState({
          camps: camps.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  createNewCamp = e => {
    e.preventDefault();
    this.setState({
      formOpen: !this.state.formOpen
    });
  };

  handleCampSort = e => {
    e.preventDefault();
    let sortedData = handleSort(e, this.state.camps, this.state.sortStatus);
    this.setState({
      camps: sortedData.data,
      sortStatus: sortedData.sortStatus
    });
  };

  handleSubmit = data => {
    appClient
      .newCamp(data)
      .then(() => {
        this.refreshCamps();
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleClose = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  };

  render() {
    let content = this.state.camps.map((camp, i) => {
      return <AdminSessionCell key={i} data={camp} />;
    });
    return (
      <div>
        <table className="table table-sm">
          <thead>
            <tr>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleCampSort}
                  id="name"
                  value="name"
                >
                  Name
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleCampSort}
                  id="type"
                  value="type"
                >
                  Type
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleCampSort}
                  id="startDate"
                  value="startDate"
                >
                  Start Date
                </button>
              </td>
              <td />
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        {!this.state.formOpen && (
          <button className="btn btn-primary" onClick={this.createNewCamp}>
            New Camp
          </button>
        )}
        {this.state.formOpen && (
          <AdminSessionForm
            handleSubmit={this.handleSubmit}
            handleClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}

export default AdminSessions;
