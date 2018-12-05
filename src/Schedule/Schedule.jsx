import React, { Component } from "react";
import appClient from "../appClient";
import CampList from "./CampList";
import ServerError from "../forms/ServerError";

class Schedule extends Component {
  state = {
    juniorCamps: [],
    adventureCamps: [],
    errors: {}
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

  componentDidMount() {
    this.refreshSchedule();
  }

  render() {
    return (
      <div>
        {this.state.errors.server && <ServerError />}
        <CampList camps={this.state.adventureCamps} type="adventure" />
        <CampList camps={this.state.juniorCamps} type="junior" />
      </div>
    );
  }
}

export default Schedule;
