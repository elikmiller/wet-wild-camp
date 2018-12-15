import React, { Component } from "react";
import appClient from "../appClient";
import CampList from "./CampList";
import ServerError from "../forms/ServerError";

class Schedule extends Component {
  state = {
    juniorCamps: [],
    adventureCamps: [],
    errors: {},
    type: ""
  };

  juniorText = {
    name: "Junior Camps",
    type: "junior",
    description:
      "These camps are aimed at children between the ages of 6 and 9 years old.",
    buttonText: "Click here to view Junior Camps"
  };
  adventureText = {
    name: "Adventure Camps",
    type: "adventure",
    description:
      "These camps are aimed at children between the ages of 9 and 15 years old.",
    buttonText: "Click here to view Adventure Camps"
  };

  refreshSchedule = () => {
    appClient
      .getCamps()
      .then(res => {
        let juniorCamps = [];
        let adventureCamps = [];
        res.data.forEach(camp => {
          if (camp.type === "junior") juniorCamps.push(camp);
          else if (camp.type === "adventure") adventureCamps.push(camp);
        });
        this.setState({
          juniorCamps: juniorCamps,
          adventureCamps: adventureCamps
        });
      })
      .catch(err => {
        if (err.response.status === 500) {
          this.setState({ errors: { server: "Server Error." } });
        }
      });
  };

  setCampType = e => {
    e.preventDefault();
    this.setState({
      type: e.target.value
    });
  };

  componentDidMount() {
    this.refreshSchedule();
  }

  render() {
    return (
      <div>
        <div className="alert alert-dark" role="alert">
          <p>
            The <strong>Register</strong> page is where you can begin the
            registration process for our camp sessions.
          </p>
          <hr />
          <p className="mb-0">
            Choose between our two camp types based on the age of the child you
            want to register. 9 year olds can choose between Junior and
            Adventure camps.
          </p>
        </div>
        {this.state.errors.server && <ServerError />}
        {this.state.type === "" && (
          <div>
            <CampChoice data={this.juniorText} setCampType={this.setCampType} />
            <CampChoice
              data={this.adventureText}
              setCampType={this.setCampType}
            />
          </div>
        )}
        {this.state.type === "junior" && (
          <CampList
            camps={this.state.juniorCamps}
            type="junior"
            refresh={this.refreshSchedule}
          />
        )}
        {this.state.type === "adventure" && (
          <CampList
            camps={this.state.adventureCamps}
            type="adventure"
            refresh={this.refreshSchedule}
          />
        )}
      </div>
    );
  }
}

export default Schedule;

export const CampChoice = props => {
  return (
    <div className="card" style={{ marginBottom: "30px" }}>
      <div className="card-body">
        <h5 className="card-title">{props.data.name}</h5>
        <p className="card-text">{props.data.description}</p>
        <button
          className="btn btn-primary btn-block"
          value={props.data.type}
          onClick={props.setCampType}
        >
          {props.data.buttonText}
        </button>
      </div>
    </div>
  );
};
