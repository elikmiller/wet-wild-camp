import React, { Component } from "react";
import AdminRosterCell from "./AdminRosterCell";
import handleSort from "../../sort";
import appClient from "../../appClient";

class AdminSessionRoster extends Component {
  state = {
    campers: [],
    waitlist: [],
    campId: "",
    camp: {},
    listShowing: "roster",
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
      },
      notes: {
        engaged: false,
        ascending: true
      },
      morningDropoff: {
        engaged: false,
        ascending: true
      },
      afternoonPickup: {
        engaged: false,
        ascending: true
      }
    }
  };

  componentDidMount() {
    this.getCamp();
    this.refreshCampers();
  }

  getCamp = () => {
    appClient
      .getCamp(this.props.match.params.campId)
      .then(camp => {
        this.setState({
          camp: camp.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  refreshCampers = () => {
    let { campId } = this.props.match.params;
    appClient.getCamp(campId).then(camp => {
      let camperArray = camp.data.campers.map(registration => {
        registration.camper["registration"] = registration;
        registration.camper["morningDropoff"] = registration.morningDropoff;
        registration.camper["afternoonPickup"] = registration.afternoonPickup;
        return registration.camper;
      });
      let waitlistArray = camp.data.waitlist.map(registration => {
        registration.camper["registration"] = registration;
        registration.camper["morningDropoff"] = registration.morningDropoff;
        registration.camper["afternoonPickup"] = registration.afternoonPickup;
        return registration.camper;
      });
      this.setState({
        campers: camperArray,
        waitlist: waitlistArray,
        campId: campId
      }).catch(err => {
        console.error(err);
      });
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

  capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  toggleWaitlist = e => {
    e.preventDefault();
    let newList = this.state.listShowing === "roster" ? "waitlist" : "roster";
    this.setState({
      listShowing: newList
    });
  };

  render() {
    let listUsed =
      this.state.listShowing === "roster"
        ? this.state.campers
        : this.state.waitlist;
    let content = listUsed.map((camper, i) => {
      return (
        <AdminRosterCell
          key={i}
          data={camper}
          type={this.state.listShowing}
          campId={this.state.campId}
          refresh={this.refreshCampers}
        />
      );
    });
    let buttonText =
      this.state.listShowing === "roster" ? "waitlist" : "roster";
    return (
      <div>
        <button
          className="btn btn-primary btn-block"
          onClick={this.toggleWaitlist}
        >
          View {this.capitalizeFirst(buttonText)}
        </button>
        <br />
        <h3>{`${this.state.camp.name || ""} ${this.capitalizeFirst(
          this.state.camp.type || ""
        )} ${this.capitalizeFirst(this.state.listShowing)}`}</h3>
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
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleCamperSort}
                  id="notes"
                  value="notes"
                >
                  Notes?
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleCamperSort}
                  id="morningDropoff"
                  value="morningDropoff"
                >
                  Morning
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleCamperSort}
                  id="afternoonPickup"
                  value="afternoonPickup"
                >
                  Afternoon
                </button>
              </td>
              <td />
              <td />
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default AdminSessionRoster;
