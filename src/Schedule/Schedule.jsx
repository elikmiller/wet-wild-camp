import React, { Component } from "react";
import appClient from "../appClient";
import CampList from "./CampList";
import ServerError from "../forms/ServerError";
import Spinner from "../Spinner/Spinner";
import moment from "moment";

class Schedule extends Component {
  state = {
    juniorCamps: [],
    adventureCamps: [],
    errors: {},
    type: "",
    isLoading: false
  };

  juniorText = {
    name: "Junior Camps",
    type: "junior",
    description:
      "These camps are aimed at children between the ages of 6 and 9 years old.",
    buttonText: "View Junior Camps"
  };
  adventureText = {
    name: "Adventure Camps",
    type: "adventure",
    description:
      "These camps are aimed at children between the ages of 9 and 15 years old.",
    buttonText: "View Adventure Camps"
  };

  refreshSchedule = () => {
    this.setState({
      isLoading: true,
      errors: {}
    });
    appClient
      .getCamps()
      .then(res => {
        let juniorCamps = [];
        let adventureCamps = [];
        res.data.forEach(camp => {
          if (camp.type === "junior") juniorCamps.push(camp);
          else if (camp.type === "adventure") adventureCamps.push(camp);
        });
        let sortedJuniorCamps = this.sortCampsByStartDate(juniorCamps);
        let sortedAdventureCamps = this.sortCampsByStartDate(adventureCamps);
        this.setState({
          juniorCamps: sortedJuniorCamps,
          adventureCamps: sortedAdventureCamps,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        if (err.response.status === 500) {
          this.setState({ errors: { server: "Server Error." } });
        }
      });
  };

  sortCampsByStartDate = camps => {
    return camps.sort((a, b) => {
      return moment.utc(a.startDate).diff(moment.utc(b.startDate));
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
    if (this.state.isLoading) return <Spinner />;
    return (
      <div className="wrapper schedule-wrapper">
        <div className="alert alert-dark" role="alert">
          <p>
            The <strong>Register</strong> page is where you can begin the
            registration process for our camp sessions.
          </p>
          <hr />
          <p className="mb-0">
            Choose between our two camp types based on the age of the child you
            want to register. 9 year olds can choose between Junior and
            Adventure camps.{" "}
            <a
              href="https://wetwildcamp.com/camp-information/8-year-olds-adv-camp-or-jr-camp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
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
    <div className="card mb-3">
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
