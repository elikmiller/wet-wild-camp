import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import _ from "lodash";

class AdminRosterSwimming extends Component {
  state = {
    camp: {},
    campers: [],
    isLoading: false
  };

  componentDidMount() {
    this.getCamp(this.props.match.params.campId);
  }

  getCamp = campId => {
    this.setState({ isLoading: true });
    appClient
      .getCamp(campId)
      .then(camp => {
        this.setState({
          camp: camp.data,
          campers: camp.data.campers.map(registration => registration.camper),
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  };

  updateManyCampers = campers => {
    this.setState({ isLoading: true });
    appClient
      .updateManyCampers(campers)
      .then(() => {
        this.props.history.push(`/admin/rosters/${this.state.camp._id}`);
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  };

  handleSave = () => {
    this.updateManyCampers(this.state.campers);
  };

  handleChange = e => {
    let campers = this.state.campers.slice();
    let camperIndex = _.findIndex(campers, { _id: e.target.name });
    if (camperIndex !== -1)
      campers[camperIndex].swimmingStrength = e.target.value;
    this.setState({
      campers
    });
  };

  render() {
    return (
      <div className="admin-roster-swimming spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <p className="lead">
          {this.state.camp.name} {_.capitalize(this.state.camp.type)} - Swimming
          Ability
        </p>
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
              {this.state.campers &&
                this.state.campers.map((camper, i) => (
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
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.handleSave}
        >
          Save
        </button>
      </div>
    );
  }
}

export default AdminRosterSwimming;
