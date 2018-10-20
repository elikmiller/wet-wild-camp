import React, { Component } from "react";
import appClient from "../../appClient";
import handleSort from "../../sort";
import AdminSessionCell from "./AdminSessionCell";

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
    }
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

  handleCampSort = e => {
    e.preventDefault();
    let sortedData = handleSort(e, this.state.camps, this.state.sortStatus);
    this.setState({
      camps: sortedData.data,
      sortStatus: sortedData.sortStatus
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
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default AdminSessions;
