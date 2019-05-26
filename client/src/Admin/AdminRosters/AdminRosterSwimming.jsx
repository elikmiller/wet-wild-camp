import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";

class AdminRosterSwimming extends Component {
  state = {
    camp: {},
    campers: [],
    isLoading: false
  };

  componentDidMount() {
    this.getCamp();
  }

  getCamp = () => {
    this.setState({ isLoading: true });
    return appClient
      .adminGetCamp(this.props.match.params.campId)
      .then(camp => {
        let campersArr = camp.registrations.map(
          registration => registration.camper
        );
        campersArr.sort((a, b) => {
          let nameA = a.firstName.toLowerCase(),
            nameB = b.firstName.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.setState({
          camp,
          campers: campersArr,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        this.setState(() => {
          throw err;
        });
      });
  };

  updateCamperBulk = () => {
    this.setState({ isLoading: true });
    appClient
      .adminUpdateCamperBulk(this.state.campers)
      .then(() => {
        this.props.history.push(`/admin/rosters/${this.state.camp._id}`);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        this.setState(() => {
          throw err;
        });
      });
  };

  handleSave = () => {
    this.updateCamperBulk(this.state.campers);
  };

  handleCancel = () => {
    this.props.history.push(`/admin/rosters/${this.state.camp._id}`);
  };

  handleChange = e => {
    let campers = this.state.campers.map(camper => {
      if (camper._id !== e.target.name) return camper;
      camper.swimmingStrength = e.target.value;
      return camper;
    });
    this.setState({
      campers
    });
  };

  render() {
    let campers = this.state.campers;
    return (
      <div className="admin-roster-swimming spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <p className="lead">{this.state.camp.fullName} - Swimming</p>

        <div
          className="table-responsive"
          style={{ fontSize: "75%", tableLayout: "fixed" }}
        >
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>None</th>
                <th>Weak</th>
                <th>Fair</th>
                <th>Strong</th>
              </tr>
            </thead>
            <tbody>
              {campers.map((camper, i) => (
                <tr key={i}>
                  <td>{camper.firstName}</td>
                  <td>{camper.lastName}</td>
                  <td>
                    <input
                      onChange={this.handleChange}
                      type="radio"
                      name={camper._id}
                      value="none"
                      checked={
                        camper.swimmingStrength === "none" ||
                        !camper.swimmingStrength
                      }
                    />
                  </td>
                  <td>
                    <input
                      onChange={this.handleChange}
                      type="radio"
                      name={camper._id}
                      value="weak"
                      checked={camper.swimmingStrength === "weak"}
                    />
                  </td>
                  <td>
                    <input
                      onChange={this.handleChange}
                      type="radio"
                      name={camper._id}
                      value="fair"
                      checked={camper.swimmingStrength === "fair"}
                    />
                  </td>
                  <td>
                    <input
                      onChange={this.handleChange}
                      type="radio"
                      name={camper._id}
                      value="strong"
                      checked={camper.swimmingStrength === "strong"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-3">
            <button
              className="btn btn-outline-secondary mr-3"
              type="button"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminRosterSwimming;
